import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { createElement } from "react";
import { Card, CardContent } from "../ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  iconName: string;
  description?: string;
  className?: string;
}

const StatsCard = ({
  title,
  value,
  iconName,
  description,
  className,
}: StatsCardProps) => {
  const Icon = getIconComponent(iconName);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {/* Decorative Gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-primary/70 to-primary/30" />

      <CardContent className="p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              {title}
            </p>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {value}
            </h3>

            {description && (
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            )}
          </div>

          <div
            className="
              shrink-0
              h-12 w-12
              sm:h-14 sm:w-14
              rounded-2xl
              bg-linear-to-br
              from-primary/20
              to-primary/5
              flex items-center justify-center
              text-primary
              transition-transform duration-300
              group-hover:scale-110
            "
          >
            {createElement(Icon, {
              className: "h-6 w-6 sm:h-7 sm:w-7",
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;