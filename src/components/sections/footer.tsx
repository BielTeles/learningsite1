"use client";

import { motion } from "framer-motion";
import { 
  Code, 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  Instagram,
  ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  services: [
    { name: "Desenvolvimento Web", href: "services" },
    { name: "Apps Mobile", href: "services" },
    { name: "E-commerce", href: "services" },
    { name: "Consultoria", href: "services" }
  ],
  company: [
    { name: "Sobre Nós", href: "about" },
    { name: "Nossa Equipe", href: "team" },
    { name: "Carreiras", href: "team" },
    { name: "Blog", href: "#" }
  ],
  resources: [
    { name: "Projetos", href: "projects" },
    { name: "Casos de Sucesso", href: "projects" },
    { name: "Tecnologias", href: "services" },
    { name: "Suporte", href: "contact" }
  ],
  legal: [
    { name: "Privacidade", href: "#" },
    { name: "Termos de Uso", href: "#" },
    { name: "Cookies", href: "#" },
    { name: "LGPD", href: "#" }
  ]
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" }
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollToSection = (sectionId: string) => {
  if (sectionId === "#") return;
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="flex items-center space-x-2 mb-6 hover:opacity-80 transition-opacity"
              >
                <div className="relative">
                  <Code className="h-8 w-8 text-primary" />
                  <Zap className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                </div>
                <span className="text-xl font-bold text-foreground">TechCorp</span>
              </button>
              
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Transformamos ideias em soluções tecnológicas inovadoras. 
                Há mais de 5 anos criando o futuro digital.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-foreground/60">
                  <Mail className="h-4 w-4 mr-3" />
                  <span>contato@techcorp.com</span>
                </div>
                <div className="flex items-center text-foreground/60">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>+55 (11) 99999-9999</span>
                </div>
                <div className="flex items-center text-foreground/60">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>São Paulo, SP</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Serviços</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-foreground/60 hover:text-foreground transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    {link.href === "#" ? (
                      <span className="text-foreground/60">{link.name}</span>
                    ) : (
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-foreground/60 hover:text-foreground transition-colors duration-200 text-left"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-foreground/60 hover:text-foreground transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
              <p className="text-sm text-foreground/60 mb-4">
                Receba nossas novidades e dicas tecnológicas.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button size="sm" className="w-full">
                  Inscrever-se
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-foreground/60">
              © 2024 TechCorp. Todos os direitos reservados.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link, index) => (
                <span
                  key={index}
                  className="text-sm text-foreground/60"
                >
                  {link.name}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-secondary/50 rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-primary/10 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
} 