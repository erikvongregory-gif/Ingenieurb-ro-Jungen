import { Container } from "@/components/ui";
import { StatementText } from "./StatementText";
import { Facts } from "./Facts";

export function Statement() {
  return (
    <section className="pb-24 md:pb-36">
      <Container>
        <StatementText />

        <Facts />
      </Container>
    </section>
  );
}
