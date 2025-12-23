import {Button} from "@/components/ui/button"
import CompanionCard from "@/components/ui/CompanionCard"
import CompanionList from "@/components/ui/CompanionsList"
import CTA from "@/components/ui/CTA"

export default function Page() {
  return (
    <main>
      <div>
        <h1>Popular Companions</h1>

          <section className="home-section">
            <CompanionCard
              id="123"
              name="Neura the Brainy EXplorer"
              topic="Nuera Network of the Brain"
              subject="science"
              duration={45}
              color="#ffda6e"
            />
            <CompanionCard
              id="456"
              name="Countsy the Number Wizard"
              topic="Derivatives & Integrals"
              subject="maths"
              duration={30}
              color="#e5d0ff"
            />
            <CompanionCard
              id="789"
              name="Verba the Vocabulary Builder"
              topic="languaje"
              subject="English Literature"
              duration={30}
              color="#BDE7FF"
            />
          </section>

          <section className="home-section">
            <CompanionList/>
            <CTA />
          </section>

      </div>
    </main>
  )
}
