import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface Experience {
  _id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  description: string
  achievements: string[]
}

interface ExperienceProps {
  experiences: Experience[]
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">Professional Experience</h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -ml-px md:ml-0" />

          {experiences.map((experience, index) => (
            <div
              key={experience._id}
              className={`relative mb-12 ${
                index % 2 === 0 ? "md:pr-12 md:ml-auto md:mr-1/2" : "md:pl-12 md:mr-auto md:ml-1/2"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 rounded-full bg-primary -ml-2 md:-ml-2" />

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <CardTitle>{experience.position}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(experience.startDate), "MMM yyyy")} -
                      {experience.endDate ? format(new Date(experience.endDate), " MMM yyyy") : " Present"}
                    </span>
                  </div>
                  <div className="text-lg font-medium">{experience.company}</div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{experience.description}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

