import Title from "@/components/layout/container/title";

export default function About() {
  return (
    <div className="container bg-base border rounded-lg shadow p-4">
      <Title title="about" />

      <p className="text-center">
        lfpweather.com is a website that provides local weather observations,
        forecasts, and cameras for the Lake Forest Park, Washington area.
      </p>
    </div>
  );
}
