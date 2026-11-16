import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  getRouteForUserProfile,
  type UserProfile,
} from "../lib/api/auth";

describe("OrionKids — Account Restriction Experience & Frontend Safety Suite", () => {
  it("1. getRouteForUserProfile routes RESTRICTED user immediately to /account/restricted", () => {
    const restrictedProfile: UserProfile = {
      id: "user_restr_123",
      name: "Alex Parent",
      email: "alex@example.com",
      role: "USER",
      status: "RESTRICTED",
      restrictedReason: "Administrative hold pending review",
      termsAccepted: true,
      hasCompletedOnboarding: true,
    };

    const destination = getRouteForUserProfile(restrictedProfile);
    assert.equal(destination, "/account/restricted");
  });

  it("2. getRouteForUserProfile preserves standard workflows for ADMIN, ACTIVE, and PENDING users", () => {
    // Active Admin
    const adminProfile: UserProfile = {
      id: "admin_1",
      name: "Admin User",
      email: "admin@orionkids.test",
      role: "ADMIN",
      status: "ACTIVE",
    };
    assert.equal(getRouteForUserProfile(adminProfile), "/admin");

    // Terms pending
    const termsPendingProfile: UserProfile = {
      id: "user_2",
      name: "New Parent",
      email: "new@example.com",
      role: "USER",
      status: "PENDING",
      termsAccepted: false,
    };
    assert.equal(getRouteForUserProfile(termsPendingProfile), "/terms-and-conditions");

    // Pending access review
    const pendingProfile: UserProfile = {
      id: "user_3",
      name: "Pending Parent",
      email: "pending@example.com",
      role: "USER",
      status: "PENDING",
      termsAccepted: true,
      accessRequestStatus: "PENDING",
    };
    assert.equal(getRouteForUserProfile(pendingProfile), "/access-pending");

    // Active Parent with completed onboarding
    const activeProfile: UserProfile = {
      id: "user_4",
      name: "Active Parent",
      email: "active@example.com",
      role: "USER",
      status: "ACTIVE",
      termsAccepted: true,
      hasCompletedOnboarding: true,
    };
    assert.equal(getRouteForUserProfile(activeProfile), "/dashboard");
  });

  it("3. Restricted Page UI adheres strictly to Phase E copy, branding, and action specifications", () => {
    const restrictedPagePath = path.join(
      process.cwd(),
      "app/account/restricted/page.tsx"
    );
    const content = fs.readFileSync(restrictedPagePath, "utf-8");

    // Main Heading
    assert.ok(
      content.includes("Your Account Has Been Restricted"),
      "Must display exact main heading: 'Your Account Has Been Restricted'"
    );

    // Primary Description
    assert.ok(
      content.includes(
        "Your access to OrionKids has been temporarily restricted by our administration team."
      ),
      "Must display exact description"
    );

    // Supporting Message
    assert.ok(
      content.includes(
        "If you believe this action was taken by mistake, please contact the OrionKids support team for assistance."
      ),
      "Must display exact supporting message"
    );

    // Verified Support Email
    assert.ok(
      content.includes("support@orionkids.in"),
      "Must use verified support email support@orionkids.in"
    );

    // Actions
    assert.ok(content.includes("Contact Support"), "Must have Contact Support action");
    assert.ok(content.includes("Sign Out"), "Must have Sign Out action");
    assert.ok(content.includes("performSignOut"), "Must bind performSignOut to sign out button");

    // Display admin restriction reason if available
    assert.ok(
      content.includes("profile?.restrictedReason") || content.includes("profile.restrictedReason"),
      "Must conditionally render profile.restrictedReason safely"
    );

    // Prevent redirect loops
    assert.ok(
      content.includes("user.status !== \"RESTRICTED\""),
      "Must only route away users whose status is verified as not restricted"
    );
  });

  it("4. AccountStatusListener is mounted globally in RootLayout and guards protected routes", () => {
    const layoutPath = path.join(process.cwd(), "app/layout.tsx");
    const layoutContent = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      layoutContent.includes("<AccountStatusListener />"),
      "AccountStatusListener must be mounted in RootLayout"
    );

    const listenerPath = path.join(
      process.cwd(),
      "components/auth/account-status-listener.tsx"
    );
    const listenerContent = fs.readFileSync(listenerPath, "utf-8");
    assert.ok(
      listenerContent.includes("BroadcastChannel"),
      "Must support cross-tab synchronization via BroadcastChannel"
    );
    assert.ok(
      listenerContent.includes("visibilitychange"),
      "Must check status on document visibilitychange"
    );
    assert.ok(
      listenerContent.includes("clearInterval"),
      "Must properly clean up polling interval on unmount to prevent leaks"
    );
  });

  it("5. API clients immediately intercept ACCOUNT_RESTRICTED (403) and route to /account/restricted", () => {
    const questApiPath = path.join(process.cwd(), "lib/api/quest.ts");
    const questContent = fs.readFileSync(questApiPath, "utf-8");
    assert.ok(
      questContent.includes("ACCOUNT_RESTRICTED"),
      "Quest API client must intercept ACCOUNT_RESTRICTED"
    );
    assert.ok(
      questContent.includes("/account/restricted"),
      "Quest API client must route to /account/restricted on 403"
    );

    const queuePath = path.join(process.cwd(), "lib/api/checkpoint-queue.ts");
    const queueContent = fs.readFileSync(queuePath, "utf-8");
    assert.ok(
      queueContent.includes("ACCOUNT_RESTRICTED"),
      "Checkpoint queue must intercept ACCOUNT_RESTRICTED"
    );
    assert.ok(
      queueContent.includes("/account/restricted"),
      "Checkpoint queue must route to /account/restricted"
    );

    const sessionPath = path.join(process.cwd(), "lib/api/session.ts");
    const sessionContent = fs.readFileSync(sessionPath, "utf-8");
    assert.ok(
      sessionContent.includes("ACCOUNT_RESTRICTED"),
      "Session API must intercept ACCOUNT_RESTRICTED"
    );

    const childrenPath = path.join(process.cwd(), "lib/api/children.ts");
    const childrenContent = fs.readFileSync(childrenPath, "utf-8");
    assert.ok(
      childrenContent.includes("ACCOUNT_RESTRICTED"),
      "Children API must intercept ACCOUNT_RESTRICTED"
    );
  });
});

