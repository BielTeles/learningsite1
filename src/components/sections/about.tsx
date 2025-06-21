"use client";

import { motion } from "framer-motion";
import { CheckCircle, Users, Trophy, Target } from "lucide-react";

const stats = [
  { icon: Users, value: "50+", label: "Especialistas" },
  { icon: Trophy, value: "100+", label: "Projetos Concluídos" },
  { icon: Target, value: "98%", label: "Taxa de Sucesso" },
  { icon: CheckCircle, value: "24/7", label: "Suporte" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Sobre a TechCorp
            </span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Construindo o Futuro Digital
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="max-w-3xl mx-auto text-lg text-foreground/70 leading-relaxed"
          >
            Há mais de 5 anos, transformamos ideias em soluções tecnológicas inovadoras. 
            Nossa equipe de especialistas trabalha incansavelmente para entregar produtos 
            excepcionais que impulsionam o crescimento dos nossos clientes.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">Nossa Missão</h3>
            <p className="text-foreground/70 leading-relaxed">
              Democratizar o acesso à tecnologia de ponta, fornecendo soluções personalizadas 
              que atendam às necessidades específicas de cada cliente. Acreditamos que a 
              inovação deve ser acessível a empresas de todos os tamanhos.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Excelência Técnica</h4>
                  <p className="text-sm text-foreground/60">Utilizamos as mais recentes tecnologias e melhores práticas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Abordagem Colaborativa</h4>
                  <p className="text-sm text-foreground/60">Trabalhamos lado a lado com nossos clientes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Resultados Mensuráveis</h4>
                  <p className="text-sm text-foreground/60">Focamos em entregar valor real e impacto positivo</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-foreground/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 