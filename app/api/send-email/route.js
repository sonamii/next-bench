import { Resend } from "resend";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();


/**
 * Handles the POST request to send an email to the host.
 * @param {Request} req The incoming request.
 * @returns {Response} The response.
 */
export async function POST(req) {
  try {
    const { userEmail } = await req.json();

    if (!userEmail || !userEmail.includes("@") || !userEmail.includes(".")) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
        }
      );
    }

    const resend = new Resend(serverRuntimeConfig.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: "notify@resend.dev",
      to: serverRuntimeConfig.PRIVATE_EMAIL,
      subject: "Subscription Added",
      html: `<p>A new subscription to Next-Bench has been added. User: ${userEmail}</p>`,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
