import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import "@/custom/styles/faq.css";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading: string;
  description: string;
  items?: FaqItem[];
  supportHeading: string;
  supportDescription: string;
  supportButtonText: string;
  supportButtonUrl: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 30-day free trial that gives you full access to all platform features. You can explore AI-powered school recommendations, application tracking, and admission insights before committing to a subscription.",
  },
  {
    id: "faq-2",
    question: "What are the key features of your platform?",
    answer:
      "Our platform provides AI-powered school recommendations, real-time application tracking, personalized admission guidance, detailed school profiles, and insights into tuition fees, reviews, and success rates.",
  },
  {
    id: "faq-3",
    question: "What is the success rate of this platform?",
    answer:
      "We have a 95% success rate in helping students find the right schools based on their academic background, preferences, and career goals.",
  },
  {
    id: "faq-4",
    question: "Can school authorities view my profile?",
    answer:
      "No, your profile remains completely private unless you choose to share it with specific institutions during the application process.",
  },
  {
    id: "faq-5",
    question: "What type of information does this platform provide?",
    answer:
      "Our platform offers comprehensive details on admission requirements, tuition fees, course offerings, faculty quality, student reviews, and career prospects for various institutions.",
  },
  {
    id: "faq-6",
    question: "How can I withdraw or modify my application?",
    answer:
      "If you need to withdraw or modify your application, you can contact our support team. Changes can be made before the submission deadline, and withdrawals are processed within 48 hours.",
  },
];

const Faq3 = ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
  supportHeading = "Need more support?",
  supportDescription = "Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance.",
  supportButtonText = "Contact Support",
  supportButtonUrl = "https://www.shadcnblocks.com",
}: Faq3Props) => {
  return (
    <section className="faqContainer">
      <div className="container space-y-16">
        <div
          style={{
            maxWidth: "1000%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className="text-center mx-auto"
        >
          <h2 className="textTop">{heading}</h2>
          <p className="textBottom">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
          style={{ backgroundColor: "#ffffff00", paddingInline: "20px" }}
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
          <div className="relative">
            <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="mb-4 size-16 border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
            {supportHeading}
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            {supportDescription}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" asChild>
              <a href={supportButtonUrl} target="_blank">
                {supportButtonText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq3 };
