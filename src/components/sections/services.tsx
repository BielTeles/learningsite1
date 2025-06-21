"use client";

import { motion } from "framer-motion";
import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Shield, 
  Zap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code,
    title: "Desenvolvimento Web",
    description: "Criamos aplicações web modernas, responsivas e performáticas usando as mais recentes tecnologias como React, Next.js e Node.js.",
    features: ["React & Next.js", "Node.js & Express", "TypeScript", "API REST"]
  },
  {
    icon: Smartphone,
    title: "Apps Mobile",
    description: "Desenvolvemos aplicativos móveis nativos e híbridos para iOS e Android, focando em experiência do usuário excepcional.",
    features: ["React Native", "Flutter", "iOS & Android", "UI/UX Design"]
  },
  {
    icon: Globe,
    title: "E-commerce",
    description: "Soluções completas de comércio eletrônico com integração de pagamentos, gestão de estoque e analytics avançados.",
    features: ["Shopify", "WooCommerce", "Stripe", "Analytics"]
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description: "Arquiteturas robustas e escaláveis para suportar suas aplicações com APIs RESTful e GraphQL.",
    features: ["RESTful APIs", "GraphQL", "Microserviços", "DevOps"]
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Implementamos as melhores práticas de segurança para proteger seus dados e aplicações contra ameaças.",
    features: ["SSL/TLS", "OAuth 2.0", "GDPR", "Auditoria"]
  },
  {
    icon: Zap,
    title: "Consultoria",
    description: "Orientação estratégica para transformação digital, arquitetura de software e otimização de processos.",
    features: ["Arquitetura", "Code Review", "Performance", "Mentoria"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-secondary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nossos Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Soluções Completas em Tecnologia
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-foreground/70 leading-relaxed">
            Oferecemos uma gama completa de serviços tecnológicos para levar seu negócio 
            ao próximo nível no mundo digital.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-background border border-border rounded-2xl p-8 hover:shadow-2xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-foreground/60">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="ghost" 
                  className="group/btn p-0 h-auto text-primary hover:text-primary"
                >
                  Saiba mais
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 