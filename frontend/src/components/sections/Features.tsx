import { motion } from 'framer-motion'
import { reveal } from '@/lib/motion'
import { featureTiles } from '@/data/landing'
import { SectionIntro } from '../shared/SectionIntro'
import { FeatureCard } from '../shared/FeatureCard'

export function Features() {
  return (
    <motion.section {...reveal(0.08)}>
      <SectionIntro
        eyebrow="Features"
        title="Everything teams need to hire faster and with more confidence"
        description="From candidate tracking to AI insights, every core workflow is designed to reduce friction and improve decision quality."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:auto-rows-[minmax(220px,1fr)]">
        {featureTiles.map((tile, index) => (
          <motion.div key={tile.title} {...reveal(index * 0.05 + 0.08)}>
            <FeatureCard tile={tile} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
