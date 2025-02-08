import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import CurrentCardSuspense from "./current-card-suspense";

export default function CurrentContainerSuspense() {
  return (
    <Container>
      <Title title="current conditions" />
      <div className="flex w-full justify-center flex-wrap gap-2 md:gap-4 py-4">
        {[...Array(7)].map((_, index) => (
          <CurrentCardSuspense key={index} />
        ))}
      </div>
    </Container>
  );
}
