import RolesWeSource from '@/components/sections/RolesWeSource'
import FinalCTA from '@/components/sections/FinalCTA'
import Button from '@/components/common/Button'
import MotionSection from '@/components/ui/MotionSection'

export default function Page() {
  return (
    <main className="pt-20 min-h-screen">
      <RolesWeSource />
      <MotionSection className="section-wrap" variant="fadeUp">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3 title-gradient">
            Find your dream job today
          </h2>
          <p className="text-sm text-text-muted max-w-2xl mx-auto">
            Browse live openings and apply directly on our Recruit CRM.
          </p>
          <div className="mt-6">
            <Button href="/jobs" variant="luxury" size="lg">
              View Jobs
            </Button>
          </div>
        </div>
      </MotionSection>
      <FinalCTA />
    </main>
  )
}
