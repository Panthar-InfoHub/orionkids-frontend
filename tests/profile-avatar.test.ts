import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getInitials } from "../components/shared/profile-avatar";

describe("OrionKids — Global Profile Image & Avatar Delivery Suite", () => {
  describe("1. Initials Generation & Deterministic Fallback Logic", () => {
    it("handles two-word user names correctly (First + Last initial)", () => {
      assert.equal(getInitials("Samarth Dixit"), "SD");
      assert.equal(getInitials("Atul Dixit"), "AD");
      assert.equal(getInitials("Nandini Sahu"), "NS");
      assert.equal(getInitials("Bhoomi Rajeet"), "BR");
    });

    it("handles single-word user names (first 2 letters capitalized)", () => {
      assert.equal(getInitials("Admin"), "AD");
      assert.equal(getInitials("Samarth"), "SA");
      assert.equal(getInitials("A"), "A");
    });

    it("handles multi-word names (takes first two significant words)", () => {
      assert.equal(getInitials("John Michael Doe"), "JM");
      assert.equal(getInitials("Orion Kids Platform"), "OK");
    });

    it("handles null, undefined, empty, or whitespace-only names with default 'OK'", () => {
      assert.equal(getInitials(null), "OK");
      assert.equal(getInitials(undefined), "OK");
      assert.equal(getInitials(""), "OK");
      assert.equal(getInitials("   "), "OK");
    });

    it("strips special characters and extracts clean alphanumeric characters", () => {
      assert.equal(getInitials("@Administrator"), "AD");
      assert.equal(getInitials("User-01"), "US");
      assert.equal(getInitials("User 01"), "U0");
      assert.equal(getInitials("!!!"), "OK");
    });
  });

  describe("2. Profile Avatar Component Contract & Architecture", () => {
    it("exports ProfileAvatar component and getInitials function", () => {
      const avatarModulePath = path.resolve(
        process.cwd(),
        "components/shared/profile-avatar.tsx"
      );
      assert.ok(fs.existsSync(avatarModulePath), "profile-avatar.tsx must exist");

      const fileContent = fs.readFileSync(avatarModulePath, "utf-8");
      assert.match(fileContent, /export function ProfileAvatar/);
      assert.match(fileContent, /export function getInitials/);
      assert.match(
        fileContent,
        /referrerPolicy="no-referrer"/,
        "ProfileAvatar must enforce referrerPolicy='no-referrer' to prevent Google CDN hotlink blocks"
      );
      assert.match(
        fileContent,
        /onError=\{.*setImageError\(true\).*\}/,
        "ProfileAvatar must capture onError and gracefully switch to initials badge"
      );
      assert.match(
        fileContent,
        /role="img"/,
        "ProfileAvatar must provide accessible role='img'"
      );
    });

    it("safely handles null, empty string, or whitespace-only URLs", () => {
      const avatarSource = fs.readFileSync(
        path.resolve(process.cwd(), "components/shared/profile-avatar.tsx"),
        "utf-8"
      );
      assert.match(
        avatarSource,
        /const trimmed = src\.trim\(\);/,
        "Must sanitize and trim src before checking length"
      );
    });
  });

  describe("3. Next.js Remote Images Configuration", () => {
    it("authorizes Google User Content domains with full path patterns in next.config.ts", () => {
      const nextConfigPath = path.resolve(process.cwd(), "next.config.ts");
      const nextConfigContent = fs.readFileSync(nextConfigPath, "utf-8");

      assert.match(
        nextConfigContent,
        /\*\.googleusercontent\.com/,
        "Must allow *.googleusercontent.com for Google profile photos"
      );
      assert.match(
        nextConfigContent,
        /googleusercontent\.com/,
        "Must allow apex googleusercontent.com domain"
      );
      assert.match(
        nextConfigContent,
        /\*\.google\.com/,
        "Must allow *.google.com for Google account assets"
      );
    });
  });

  describe("4. Application-Wide Screen Avatar Integration Verification", () => {
    it("AdminHeader renders ProfileAvatar with Cyan brand border and eager priority", () => {
      const headerPath = path.resolve(
        process.cwd(),
        "components/admin/admin-header.tsx"
      );
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.match(content, /import \{ ProfileAvatar \} from ["']@\/components\/shared\/profile-avatar["']/);
      assert.match(content, /<ProfileAvatar[^>]*src=\{admin\.image\}/);
      assert.doesNotMatch(
        content,
        /<img[^>]*src=\{admin\.image\}/,
        "No raw unshielded img tags should remain in AdminHeader"
      );
    });

    it("UserTable renders ProfileAvatar for each user record in accounts listing", () => {
      const tablePath = path.resolve(
        process.cwd(),
        "components/admin/user-table.tsx"
      );
      const content = fs.readFileSync(tablePath, "utf-8");
      assert.match(content, /import \{ ProfileAvatar \} from ["']@\/components\/shared\/profile-avatar["']/);
      assert.match(content, /<ProfileAvatar[^>]*src=\{user\.image\}/);
      assert.doesNotMatch(
        content,
        /<img[^>]*src=\{user\.image\}/,
        "No raw unshielded img tags should remain in UserTable"
      );
    });

    it("UserOverviewSection renders high-res ProfileAvatar for user 360° details", () => {
      const detailPath = path.resolve(
        process.cwd(),
        "components/admin/user-detail/user-overview-section.tsx"
      );
      const content = fs.readFileSync(detailPath, "utf-8");
      assert.match(content, /import \{ ProfileAvatar \} from ["']@\/components\/shared\/profile-avatar["']/);
      assert.match(content, /<ProfileAvatar[^>]*src=\{user\.image\}/);
      assert.match(content, /size="xl"/, "User detail section should request xl avatar size");
      assert.doesNotMatch(
        content,
        /<img[^>]*src=\{user\.image\}/,
        "No raw unshielded img tags should remain in UserOverviewSection"
      );
    });

    it("Navbar renders ProfileAvatar for admin dropdown and user dashboard links", () => {
      const navbarPath = path.resolve(
        process.cwd(),
        "components/layout/navbar.tsx"
      );
      const content = fs.readFileSync(navbarPath, "utf-8");
      assert.match(content, /import \{ ProfileAvatar \} from ["']@\/components\/shared\/profile-avatar["']/);
      assert.match(content, /<ProfileAvatar[^>]*src=\{adminUser\?\.image\}/);
      assert.match(content, /<ProfileAvatar[^>]*src=\{currentUser\.image\}/);
      assert.doesNotMatch(
        content,
        /<img[^>]*src=\{adminUser\.image\}/,
        "No raw unshielded img tags should remain in Navbar"
      );
    });

    it("ParentDashboardPage displays ProfileAvatar in header and welcome card", () => {
      const dashboardPath = path.resolve(
        process.cwd(),
        "app/dashboard/page.tsx"
      );
      const content = fs.readFileSync(dashboardPath, "utf-8");
      assert.match(content, /import \{ ProfileAvatar \} from ["']@\/components\/shared\/profile-avatar["']/);
      assert.match(content, /<ProfileAvatar[^>]*src=\{profile\.image\}/);
    });
  });

  describe("5. Backend Image Serialization & Persistence Contract", () => {
    it("Backend registration service includes image in select and result types", () => {
      const regServicePath = path.resolve(
        process.cwd(),
        "../orionkids-backend/src/services/registration.service.ts"
      );
      assert.ok(fs.existsSync(regServicePath), "registration.service.ts must exist");
      const regServiceContent = fs.readFileSync(regServicePath, "utf-8");

      assert.match(
        regServiceContent,
        /image\?:\s*string\s*\|\s*null;/,
        "RegistrationStatusResult must type image?: string | null"
      );
      assert.match(
        regServiceContent,
        /image:\s*true,/,
        "getRegistrationStatus must select image from prisma"
      );
      assert.match(
        regServiceContent,
        /image:\s*user\.image,/,
        "getRegistrationStatus must serialize image in return object"
      );
    });

    it("Backend auth user update hook safeguards existing user images from null overwriting", () => {
      const authPath = path.resolve(
        process.cwd(),
        "../orionkids-backend/src/lib/auth.ts"
      );
      const authContent = fs.readFileSync(authPath, "utf-8");
      assert.match(
        authContent,
        /update:\s*\{[\s\S]*before:\s*async\s*\(user\)/,
        "Must implement user.update.before hook to protect existing profile images"
      );
    });
  });
});
