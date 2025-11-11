import { Users, Award, ThumbsUp, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2'500+",
    label: "Clients satisfaits",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500/10",
    iconColor: "text-red-600",
  },
  {
    icon: Award,
    value: "15 ans",
    label: "D'expérience",
    color: "from-primary to-primary-light",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: ThumbsUp,
    value: "93%",
    label: "Satisfaction",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    iconColor: "text-green-600",
  },
  {
    icon: Clock,
    value: "< 24h",
    label: "Temps de réponse",
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
];

export const StatsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative animate-bounce-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-card rounded-3xl p-6 lg:p-8 border border-border shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 text-center">
                  {/* Icon with glow effect */}
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                    <Icon className={`w-8 h-8 lg:w-10 lg:h-10 ${stat.iconColor} relative z-10`} />
                  </div>

                  {/* Value with gradient text */}
                  <p className={`text-4xl lg:text-5xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300`}>
                    {stat.value}
                  </p>

                  {/* Label */}
                  <p className="text-sm lg:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 blur-2xl rounded-3xl transition-opacity duration-500 -z-10`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};