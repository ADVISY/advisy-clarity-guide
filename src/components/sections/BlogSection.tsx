import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, User } from "lucide-react";

const blogPosts = [
  {
    title: "Comment choisir sa franchise LAMal ?",
    excerpt: "Découvrez les critères essentiels pour optimiser votre franchise d'assurance maladie selon votre profil de santé et votre budget.",
    category: "Assurance santé",
    readTime: "5 min",
    author: "Équipe Advisy",
    image: "/images/lamal-franchise.jpg",
    date: "Mars 2025",
  },
  {
    title: "Assurance vie ou 3e pilier : que choisir ?",
    excerpt: "Comparatif complet entre assurance vie et 3e pilier pour votre prévoyance. Avantages fiscaux, flexibilité et rendement expliqués.",
    category: "Prévoyance",
    readTime: "7 min",
    author: "Équipe Advisy",
    image: "/images/3e-pilier-conseil.jpg",
    date: "Mars 2025",
  },
  {
    title: "Les 5 erreurs à éviter en assurance maladie",
    excerpt: "Évitez les pièges courants : surprimes inutiles, couvertures inadaptées, changements tardifs. Nos conseils d'experts pour économiser.",
    category: "Conseils pratiques",
    readTime: "6 min",
    author: "Équipe Advisy",
    image: "/images/erreurs-assurance.jpg",
    date: "Février 2025",
  },
];

export const BlogSection = () => {
  return (
    <section id="blog" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Nos conseils
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Guides & conseils{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              d'experts
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Profitez de notre expertise pour mieux comprendre vos assurances et faire les bons choix
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image placeholder */}
              <div className="relative h-56 bg-gradient-to-br from-primary/20 to-primary-light/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-white/90 text-primary border-0 shadow-medium">
                    {post.category}
                  </Badge>
                </div>
                {/* Placeholder icon/pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg className="w-32 h-32 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="group/btn p-0 h-auto font-semibold text-primary hover:text-primary-dark hover:bg-transparent"
                >
                  Lire l'article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA to view all articles */}
        <div className="text-center animate-fade-in">
          <Button variant="outline" size="lg" className="group">
            <span>Voir tous les articles</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};