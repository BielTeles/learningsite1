"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "EcoCommerce Platform",
    description: "Plataforma de e-commerce sustentável com marketplace integrado, sistema de pagamentos e analytics em tempo real.",
    image: "/api/placeholder/600/400",
    tags: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
    metrics: {
      users: "10K+",
      conversion: "3.2%",
      duration: "4 meses"
    },
    category: "E-commerce"
  },
  {
    title: "HealthTech Dashboard",
    description: "Sistema de gestão hospitalar com monitoramento de pacientes, agendamentos e integração com dispositivos IoT.",
    image: "/api/placeholder/600/400",
    tags: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    metrics: {
      users: "5K+",
      uptime: "99.9%",
      duration: "6 meses"
    },
    category: "Saúde"
  },
  {
    title: "FinTech Mobile App",
    description: "Aplicativo móvel para gestão financeira pessoal com integração bancária e análise de gastos com IA.",
    image: "/api/placeholder/600/400",
    tags: ["React Native", "Python", "TensorFlow", "AWS"],
    metrics: {
      downloads: "50K+",
      rating: "4.8★",
      duration: "8 meses"
    },
    category: "Fintech"
  }
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

const projectVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Projetos em Destaque
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Casos de Sucesso
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-foreground/70 leading-relaxed">
            Conheça alguns dos projetos que desenvolvemos e os resultados excepcionais 
            que alcançamos para nossos clientes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={projectVariants}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Project Image */}
              <motion.div
                className={`relative group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ExternalLink className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-foreground/60 font-medium">Visualização do Projeto</p>
                    </div>
                  </div>
                  
                  {/* Overlay buttons */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <Button size="sm" variant="secondary">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                    <Button size="sm" variant="outline">
                      <Github className="h-4 w-4 mr-2" />
                      Código
                    </Button>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute -top-3 left-6">
                  <span className="inline-flex items-center px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </motion.div>

              {/* Project Info */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-secondary/50 text-foreground/80 text-sm rounded-full border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-xl font-bold text-primary">{value}</div>
                      <div className="text-sm text-foreground/60 capitalize">
                        {key === "users" ? "Usuários" : 
                         key === "conversion" ? "Conversão" :
                         key === "duration" ? "Duração" :
                         key === "uptime" ? "Uptime" :
                         key === "downloads" ? "Downloads" :
                         key === "rating" ? "Avaliação" : key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="group">
                    Ver Caso Completo
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline">
                    Projeto Similar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 pt-16 border-t border-border"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Pronto para o próximo projeto?
          </h3>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Vamos conversar sobre como podemos transformar sua ideia em realidade.
          </p>
          <Button size="lg" className="group">
            Iniciar Projeto
            <Calendar className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 