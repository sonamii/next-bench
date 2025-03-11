import { Resend } from "resend";

/**
 * Handles the POST request to send an email to the host.
 * @param {Request} req The incoming request.
 * @returns {Response} The response.
 */
export async function POST(req) {
  try {
    // Get the user email from the request body
    const { userEmail } = await req.json();

    // Validate the user email
    if (!userEmail || !userEmail.includes("@") || !userEmail.includes(".")) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        // Return a 400 status code
        status: 400,
      });
    }

    // Create a Resend client instance
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    // Send the email
    const data = await resend.emails.send({
      from: "notify@resend.dev",
      to: process.env.NEXT_PUBLIC_PRIVATE_EMAIL, // Email address of the host
      subject: "Subscription Added",
      html: `<p>A new subscription to Next-Bench has been added. User: ${userEmail}</p>`,
    });

    // Return a 200 success response
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    // Return a 500 error response
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
