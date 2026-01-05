import { NextResponse } from 'next/server';

// FAQ Context to feed the AI
const FAQ_CONTEXT = `
You are the AI assistant for ReWorks Solutions, a premium remote staffing and outsourcing agency.
Your goal is to help potential clients understand ReWorks' services, benefits, and processes.

Company Info:
- Name: ReWorks Solutions (or just ReWorks)
- Services: Remote staffing, outsourcing, BPO, healthcare staffing, virtual assistants.
- Key Value: Top 1% vetted talent, native English speakers, 60% cost reduction, HIPAA compliant.
- Coverage: South Africa & Philippines.
- Contact: info@reworkssolutions.com, +1 845-210-6070.

Key FAQs & Answers (Use these as a knowledge base but answer naturally):
1. Costs: Reduces payroll costs by up to 60%. No overhead for benefits, office space, or equipment.
2. Hiring Limit: No limit. Scales from 1 specialist to entire teams.
3. Minimum Period: Flexible. Short-term projects or long-term roles.
4. Bad Fit?: Ongoing support provided. Role adjustments, training, or free replacement if necessary.
5. HIPAA?: Yes, fully compliant. Strict data security for healthcare clients.
6. Technology: We integrate with client's existing stack (Slack, Teams, EHRs, etc.).
7. Payments: Monthly invoicing. Transparent pricing, no hidden fees.
8. Training: Comprehensive onboarding and ongoing training sessions supported.
9. Language: All staff are native English speakers (mostly from South Africa). Neutral accents.

Tone: Professional, helpful, concise, and friendly.
If you don't know an answer, ask them to contact support or book a call.
Do not make up facts not in this context.
`;

export async function POST(req: Request) {
  let message = ""; // Declare message in outer scope for fallback usage

  try {
    const body = await req.json();
    message = body.message;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if Hugging Face API key is configured
    const hfKey = process.env.HF_API_KEY || process.env.HUGGINGFACE_API_KEY;

    if (!hfKey) {
      console.warn('HF_API_KEY is not set. Using fallback logic.');
      return NextResponse.json({ 
        response: fallbackLogic(message),
        isFallback: true 
      });
    }

    // Use Mistral-7B-Instruct-v0.3 via Hugging Face Inference API
    // This model is excellent for instruction following and is usually available on the free tier.
    const model = "mistralai/Mistral-7B-Instruct-v0.3";
    
    // Format prompt for Mistral [INST] system + user [/INST]
    // Note: Some HF models require strict formatting, others handle raw text.
    // Mistral format is generally: <s>[INST] Instruction UserInput [/INST]
    const prompt = `<s>[INST] ${FAQ_CONTEXT}\n\nUser Question: ${message} [/INST]`;

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${hfKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
          return_full_text: false, // Only get the generated response
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Hugging Face API Error:', response.status, errorData);
      
      // If model is loading (503), fall back to logic instead of crashing
      if (response.status === 503) {
        return NextResponse.json({ 
          response: fallbackLogic(message) + " (AI is warming up, using standard response)",
          isFallback: true 
        });
      }
      
      throw new Error(`HF API error: ${response.status}`);
    }

    const result = await response.json();
    
    // HF API usually returns an array: [{ generated_text: "..." }]
    let aiResponse = "";
    if (Array.isArray(result) && result.length > 0) {
      aiResponse = result[0].generated_text;
    } else if (typeof result === 'object' && result.generated_text) {
      aiResponse = result.generated_text;
    } else {
      aiResponse = "I'm having trouble connecting right now. Please try again or book a call.";
    }

    return NextResponse.json({ response: aiResponse.trim() });

  } catch (error) {
    console.error('Error in chat API:', error);
    // Graceful degradation
    return NextResponse.json({ 
      response: fallbackLogic(message || ""), // Fallback on error so user gets *something*
      isFallback: true,
      error: 'External API Error'
    });
  }
}

// Fallback "AI" (Keyword matching) if no key is present or API fails
function fallbackLogic(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('cost') || lowerMsg.includes('price') || lowerMsg.includes('save') || lowerMsg.includes('money')) {
    return "ReWorks helps reduce costs by providing top talent at affordable rates, cutting payroll costs by up to 60%. You get advanced-level skills without the overhead of full-time employees.";
  }
  if (lowerMsg.includes('hipaa') || lowerMsg.includes('security') || lowerMsg.includes('compliant')) {
    return "Yes, ReWorks Solutions is fully compliant with HIPAA Privacy Standards. We ensure all our processes and team members meet strict compliance requirements for healthcare data.";
  }
  if (lowerMsg.includes('hire') || lowerMsg.includes('team') || lowerMsg.includes('many')) {
    return "There's no limit to the number of workers you can hire. We scale with your business needs, whether you need one specialist or an entire team.";
  }
  if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone')) {
    return "You can reach us at info@reworkssolutions.com or call +1 845-210-6070. We'd love to chat!";
  }
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return "Hello! I'm the ReWorks AI. How can I help you today?";
  }
  
  return "That's a great question! I can help with costs, hiring, HIPAA compliance, and more. For specific details, please book a call with our team.";
}
