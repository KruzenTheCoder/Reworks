'use client'

import { useState, useRef, useEffect, memo } from 'react'
import { ChevronDown, Send, Sparkles, Bot, User } from 'lucide-react'
import Button from '@/components/common/Button'
import MotionSection from "../ui/MotionSection"
import { motion, AnimatePresence, useInView } from 'framer-motion'
import TypewriterText from "../ui/TypewriterText"

const faqs = [
  {
    question: "How does ReWorks help reduce my costs?",
    answer: "ReWorks helps reduce costs by providing top talent at affordable rates, cutting payroll costs by up to 70%. You get advanced-level skills without the overhead of full-time employees, including benefits, office space, and equipment costs."
  },
  {
    question: "How many workers can I hire?",
    answer: "There's no limit to the number of workers you can hire through ReWorks. We scale with your business needs, whether you need one specialist or an entire team. Our flexible approach allows you to adjust your workforce as demands change."
  },
  {
    question: "What's the minimum hiring period?",
    answer: "We offer flexible hiring periods to match your project needs. Whether you need short-term support for specific projects or long-term team members, we can accommodate your requirements with customized arrangements."
  },
  {
    question: "What if an employee isn't a good fit?",
    answer: "We provide ongoing support throughout the employment relationship. If an employee isn't meeting expectations, we work with you to address concerns through additional training, role adjustments, or replacement if necessary. Our goal is your complete satisfaction."
  },
  {
    question: "Are you HIPAA compliant?",
    answer: "Yes, ReWorks Solutions is fully compliant with HIPAA Privacy Standards. We understand the critical importance of protecting sensitive healthcare information and ensure all our processes and team members meet strict compliance requirements."
  },
  {
    question: "What technology do I need for remote hiring?",
    answer: "We work with your existing technology stack. Our team can adapt to your current systems, whether it's project management tools, communication platforms, or industry-specific software. We'll help ensure seamless integration with minimal setup required."
  },
  {
    question: "How do payments work?",
    answer: "We offer flexible payment structures tailored to your business needs. Payments are typically processed monthly with transparent pricing and no hidden fees. We'll work with you to establish a payment schedule that aligns with your cash flow requirements."
  },
  {
    question: "Can I have multiple training sessions?",
    answer: "Absolutely! We provide comprehensive onboarding and ongoing training support. Multiple training sessions can be scheduled as needed to ensure your team members are fully equipped to meet your specific requirements and maintain high performance standards."
  },
  {
    question: "What about language barriers?",
    answer: "All ReWorks team members are native English speakers, eliminating language barriers entirely. Clear communication is fundamental to our service, ensuring seamless collaboration and understanding at every level of your operations."
  }
]

interface Message {
  id: number
  type: 'bot' | 'user'
  text: string
  isTyping?: boolean
}

// Typewriter effect for bot messages — smoothed with requestAnimationFrame
const TypewriterMessage = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    let rafId: number;
    let lastTime = Date.now();
    const interval = 20; // ms per character - slightly faster

    const loop = () => {
      const now = Date.now();
      const dt = now - lastTime;

      if (dt >= interval) {
        // Process as many characters as needed if we lagged behind (though usually just 1)
        const charsToAdd = Math.floor(dt / interval);
        
        if (charsToAdd > 0) {
          // Don't overshoot
          const nextIndex = Math.min(index + charsToAdd, text.length);
          
          if (nextIndex > index) {
            setDisplayedText(text.substring(0, nextIndex));
            index = nextIndex;
            lastTime = now;
          }
        }
      }

      if (index < text.length) {
        rafId = requestAnimationFrame(loop);
      } else {
        if (onComplete) onComplete();
      }
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [text, onComplete]);

  return (
    <p className="text-sm leading-relaxed">
      {displayedText}
      {displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-blue-600 ml-0.5 align-middle"
        />
      )}
    </p>
  );
};

// Typing indicator
const TypingIndicator = () => (
  <div className="flex gap-1.5 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl rounded-bl-sm w-fit">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-blue-600 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.2
        }}
      />
    ))}
  </div>
);

function FAQ() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, type: 'bot', text: "Hi! 👋 I'm the ReWorks AI Assistant. How can I assist you today? Pick a question below or type your own." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [showTraditionalFAQ, setShowTraditionalFAQ] = useState(false);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      // Scroll the chat container, not the entire page
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleQuestionClick = (question: string, answer: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: question
    };
    setMessages(prev => [...prev, userMessage]);
    setHasInteracted(true);

    // Show typing indicator
    setIsTyping(true);

    // After a delay, add bot response
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        text: answer
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000 + Math.random() * 1000);
  };

  const handleCustomQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: customQuestion
    };
    setMessages(prev => [...prev, userMessage]);
    setCustomQuestion('');
    setHasInteracted(true);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Call the AI chat API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: customQuestion }),
      });
      
      const data = await res.json();
      const answer = data.response || "I'm having trouble connecting right now. Please try again later.";

      setIsTyping(false);
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        text: answer
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        text: "Sorry, I'm having trouble reaching the server. Please check your connection."
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-24 bg-transparent relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <MotionSection className="max-w-6xl mx-auto px-6 md:px-8 lg:px-10 relative z-10" variant="fadeUp">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">AI-Powered Support</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-text-base mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TypewriterText
              text="Ask me anything about ReWorks"
              speed={40}
              shimmerOnComplete
              caretHeightClass="h-12"
            />
          </motion.h2>
          
          <motion.p
            className="text-xl text-text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get instant answers to your questions
          </motion.p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-white font-semibold">ReWorks Assistant</h3>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                  <span className="text-white/80 text-sm">Online</span>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div 
              ref={chatContainerRef}
              className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-gray-50/50 to-blue-50/30"
              style={{ scrollBehavior: 'smooth' }}
            >
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'bot' 
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-600' 
                          : 'bg-gradient-to-br from-gray-700 to-gray-900'
                      }`}
                    >
                      {message.type === 'bot' ? (
                        <Bot className="w-5 h-5 text-white" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </motion.div>

                    {/* Message Bubble */}
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        message.type === 'bot'
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 rounded-tl-sm text-gray-800'
                          : 'bg-gradient-to-r from-gray-700 to-gray-900 rounded-tr-sm text-white'
                      } shadow-lg`}
                    >
                      {message.type === 'bot' && index === messages.length - 1 && !isTyping && hasInteracted ? (
                        <TypewriterMessage text={message.text} />
                      ) : (
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <TypingIndicator />
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white/50">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {faqs.slice(0, 4).map((faq, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuestionClick(faq.question, faq.answer)}
                    className="text-xs px-3 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-400 text-blue-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {faq.question}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <form onSubmit={handleCustomQuestion} className="px-6 py-4 bg-white border-t border-gray-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  className="flex-1 px-4 py-3 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!customQuestion.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Toggle for Traditional FAQ — exact Solutions-style small blue text */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTraditionalFAQ(!showTraditionalFAQ)}
            className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            {showTraditionalFAQ ? 'Hide FAQs' : 'Show all FAQs'}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showTraditionalFAQ ? 'rotate-180' : ''}`} />
          </motion.button>
        </motion.div>

        {/* Traditional FAQ (Collapsible) */}
        <AnimatePresence>
          {showTraditionalFAQ && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 mb-16">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="glass-card rounded-2xl overflow-hidden border border-white/40 shadow-lg"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/50 transition-all duration-200 group"
                    >
                      <span className="text-lg font-semibold text-text-base pr-4 group-hover:gradient-text transition-all duration-300">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-blue-600 transition-transform duration-300 flex-shrink-0 ${
                          openItems.includes(index) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: openItems.includes(index) ? "auto" : 0,
                        opacity: openItems.includes(index) ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pt-0">
                        <p className="text-text-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA — exact Solutions header/CTA styling */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0, margin: '0px' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <TypewriterText
              text="You can envision your dream team."
              speed={40}
              shimmerOnComplete
              caretHeightClass="h-10"
            />
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Or you can make it happen with ReWorks Solutions.
          </p>
          <div className="text-center">
            <Button href="contact" variant="primary" size="lg">
              OUTSOURCE WITH THE EXPERTS!
            </Button>
          </div>
        </motion.div>
      </MotionSection>
    </section>
  )
}

export default memo(FAQ)
