"use server";

export interface NewsletterState {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Server action to handle Constellation Club newsletter subscriptions.
 * Ready for backend database or Mailchimp/Sendgrid/Resend integration.
 */
export async function subscribeToConstellationClub(
  prevState: NewsletterState | null,
  formData: FormData
): Promise<NewsletterState> {
  const email = formData.get("email")?.toString().trim();

  if (!email || !email.includes("@") || !email.includes(".")) {
    return {
      success: false,
      message: "Please enter a valid email address.",
      error: "invalid_email",
    };
  }

  try {
    // If future backend endpoint is configured:
    // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // if (apiUrl) {
    //   await fetch(`${apiUrl}/api/newsletter`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, list: "constellation-club" }),
    //   });
    // }

    // Simulating slight async processing time
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      message: "Welcome to The Constellation Club! Look out for your first email this Thursday morning.",
    };
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
      error: "server_error",
    };
  }
}
