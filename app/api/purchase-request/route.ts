import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../lib/email/send-email";

type PurchaseRequestData = {
  itemId: string;
  itemName: string;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
};

// Product catalog - server-trusted prices
const PRODUCTS: Record<string, { name: string; price: number }> = {
  "water-bottle": {
    name: "Water Bottle",
    price: 1000,
  },
  hoodie: {
    name: "Hoodie",
    price: 3500,
  },
};

function formatEmailBody(data: PurchaseRequestData): string {
  const sections: string[] = [];

  sections.push("=== PURCHASE REQUEST ===");
  sections.push("");
  sections.push(`Product: ${data.itemName}`);
  sections.push(`Price: ${data.price.toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  })}`);
  sections.push("");
  sections.push("Customer Details:");
  if (data.customerName) {
    sections.push(`Name: ${data.customerName}`);
  }
  sections.push(`Email: ${data.customerEmail}`);
  sections.push(`Phone: ${data.customerPhone}`);
  sections.push("");
  sections.push("---");
  sections.push(`Submitted: ${new Date().toISOString()}`);

  return sections.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const data: PurchaseRequestData = await request.json();

    // Validate required fields
    if (!data.itemId || !data.itemName || !data.customerEmail || !data.customerPhone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.customerEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate itemId exists in catalog
    const product = PRODUCTS[data.itemId];
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Invalid product" },
        { status: 400 }
      );
    }

    // Server-trust the price from catalog (ignore client-provided price)
    const serverPrice = product.price;
    const serverItemName = product.name;

    // Prepare email data with server-trusted values
    const emailData: PurchaseRequestData = {
      ...data,
      itemName: serverItemName,
      price: serverPrice,
    };

    if (!process.env.RESEND_API_KEY) {
      console.warn("Resend API key not configured. Email would be sent to: support@youthplusafrica.com");
      console.log("Purchase request data:", JSON.stringify(emailData, null, 2));

      return NextResponse.json({
        success: true,
        message: "Purchase request submitted successfully (email service not configured - check server logs)",
      });
    }

    const emailBody = formatEmailBody(emailData);
    const subject = `New Purchase Request - ${serverItemName}`;

    const emailResult = await sendEmail({
      to: "support@youthplusafrica.com",
      subject,
      text: emailBody,
      replyTo: emailData.customerEmail,
    });
    if (!emailResult.success) {
      throw new Error(emailResult.error || "Failed to send email");
    }

    return NextResponse.json({
      success: true,
      message: "Purchase request submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting purchase request:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit purchase request",
      },
      { status: 500 }
    );
  }
}
