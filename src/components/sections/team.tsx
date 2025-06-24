"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Ana Silva",
    role: "CEO & Founder",
    bio: "15 anos de experiência em liderança tecnológica e transformação digital. Formada em Ciência da Computação pela USP.",
    image: "/api/placeholder/300/300",
    skills: ["Estratégia", "Liderança", "Inovação"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "ana@techcorp.com"
    }
  },
  {
    name: "Carlos Mendoza",
    role: "CTO",
    bio: "Especialista em arquitetura de software e DevOps. 12 anos desenvolvendo soluções escaláveis para grandes empresas.",
    image: "/api/placeholder/300/300",
    skills: ["Node.js", "AWS", "DevOps"],
    social: {
      linkedin: "#",
      github: "#",
      email: "carlos@techcorp.com"
    }
  },
  {
    name: "Marina Costa",
    role: "Lead Frontend Developer",
    bio: "Especialista em React e Next.js. Criadora de interfaces incríveis e experiências de usuário memoráveis.",
    image: "/api/placeholder/300/300",
    skills: ["React", "TypeScript", "UI/UX"],
    social: {
      linkedin: "#",
      github: "#",
      email: "marina@techcorp.com"
    }
  },
  {
    name: "João Santos",
    role: "Product Manager",
    bio: "Especialista em gestão de produtos digitais. Foco em metodologias ágeis e crescimento sustentável.",
    image: "/api/placeholder/300/300",
    skills: ["Agile", "Product", "Analytics"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "joao@techcorp.com"
    }
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

export function Team() {
  return (
    <section id="team" className="py-24 bg-gradient-to-b from-secondary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nossa Equipe
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mentes Brilhantes, Resultados Excepcionais
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-foreground/70 leading-relaxed">
            Conheça os profissionais talentosos que fazem a diferença em cada projeto. 
            Nossa equipe multidisciplinar está pronta para transformar sua visão em realidade.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group bg-background border border-border rounded-2xl p-6 hover:shadow-2xl hover:border-primary/20 transition-all duration-300"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {member.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-secondary/50 text-foreground/80 text-xs rounded-full border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {Boolean(member.social.linkedin) && (
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                )}
                {Boolean(member.social.github) && (
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <Github className="h-4 w-4" />
                  </Button>
                )}
                {Boolean(member.social.twitter) && (
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <Twitter className="h-4 w-4" />
                  </Button>
                )}
                {Boolean(member.social.email) && (
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <Mail className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 pt-16 border-t border-border"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Quer fazer parte da nossa equipe?
          </h3>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Estamos sempre em busca de talentos excepcionais para se juntar à nossa missão 
            de transformar o mundo através da tecnologia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Ver Vagas Abertas
              <Mail className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              Enviar Currículo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 