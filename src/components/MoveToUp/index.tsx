import { motion } from "framer-motion"
import Image from "next/image";


const MoveToUp = ({ onUpMoveBox }: { onUpMoveBox: () => void }) => {
  return (
    <div className="fixed bottom-6 right-10 bg-white  w-12 h-12 rounded-full cursor-pointer bg-gradient-to-tr from-subPrimary to-white shadow-primary-shadow
          flex justify-center items-center rotate-180
          opacity-40
        "
      onClick={onUpMoveBox}>
      <motion.div
        initial={{ y: -5 }}
        animate={{
          y: [-3, 3, -3, 3, -3],
          opacity: [0.6, 0.8, 0.9, 0.8, 0.6],
        }}
        transition={
          {
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 2,
          }
        }
      >
        <Image src="/images/svg/arrow-down-svgrepo-com-2.svg" alt="scroll down" width={26} height={30} />
      </motion.div>
    </div>
  )
}

export default MoveToUp;