import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

type Step = 'opening' | 'image' | 'reasons' | 'question' | 'response';
type Response = 'yes' | 'maybe' | null;

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('opening');
  const [response, setResponse] = useState<Response>(null);
  const [showReasons, setShowReasons] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    if (currentStep === 'opening') {
      const timer = setTimeout(() => {
        setCurrentStep('image');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'reasons') {
      const timers = [
        setTimeout(() => setShowReasons(prev => [true, prev[1], prev[2]]), 500),
        setTimeout(() => setShowReasons(prev => [prev[0], true, prev[2]]), 1500),
        setTimeout(() => setShowReasons(prev => [prev[0], prev[1], true]), 2500),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [currentStep]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff91a4']
    });
  };

  const handleResponse = (responseType: Response) => {
    setResponse(responseType);
    setCurrentStep('response');
    if (responseType === 'yes') {
      triggerConfetti();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { duration: 0.5 }
    }
  };

  const heartVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, -10, 10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const reasonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-pink-300 rounded-full opacity-30 animate-bounce delay-100"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-rose-300 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-200 rounded-full opacity-25 animate-bounce delay-300"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-rose-200 rounded-full opacity-35 animate-pulse delay-200"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {/* Opening Section */}
          {currentStep === 'opening' && (
            <motion.div
              key="opening"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center space-y-6"
            >
              <motion.div variants={heartVariants} animate="animate">
                <Heart className="w-16 h-16 text-pink-500 mx-auto" fill="currentColor" />
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-pink-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                💌 Hi Adhelia…
              </motion.h1>
              <motion.p 
                className="text-xl text-pink-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                There's something I've been keeping for a while, and I want to say it now in a special little way.
              </motion.p>
            </motion.div>
          )}

          {/* Image Section */}
          {currentStep === 'image' && (
            <motion.div
              key="image"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center space-y-8"
            >
              <motion.h2 
                className="text-3xl font-bold text-pink-600 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                This is for you ✨
              </motion.h2>
              
              <motion.div 
                className="relative mx-auto w-80 h-80 bg-gradient-to-br from-pink-200 to-rose-300 rounded-3xl shadow-2xl border-4 border-white overflow-hidden"
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.02, rotate: 1 }}
              >
                <div className="absolute inset-4 bg-white rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Camera className="w-16 h-16 text-pink-400 mx-auto" />
                    <p className="text-pink-500 font-medium text-lg">Your Beautiful Photo</p>
                    <p className="text-pink-400 text-sm">Drag & drop or click to upload</p>
                  </div>
                </div>
                <div className="absolute top-2 left-2 right-2 flex justify-between">
                  <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
                  <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex justify-center">
                  <Sparkles className="w-6 h-6 text-pink-400" />
                </div>
              </motion.div>

              <motion.button
                onClick={() => setCurrentStep('reasons')}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Continue 💕
              </motion.button>
            </motion.div>
          )}

          {/* Reasons Section */}
          {currentStep === 'reasons' && (
            <motion.div
              key="reasons"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <motion.h2 
                className="text-3xl font-bold text-pink-600 text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Kenapa aku suka kamu ✨
              </motion.h2>

              <div className="space-y-6">
                {[
                  "Aku suka kamu karena tiap ngobrol sama kamu tuh selalu nyambung, gak pernah ngerasa canggung.",
                  "Kita sefrekuensi, bisa ketawa bareng, bisa serius bareng juga.",
                  "Intinya, aku merasa nyaman banget sama kamu, dan itu yang bikin aku makin yakin."
                ].map((reason, index) => (
                  <AnimatePresence key={index}>
                    {showReasons[index] && (
                      <motion.div
                        variants={reasonVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-200"
                      >
                        <p className="text-pink-800 text-lg leading-relaxed flex items-start">
                          <span className="text-2xl mr-3">✨</span>
                          {reason}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              <motion.div 
                className="text-center pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => setCurrentStep('question')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(236, 72, 153, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  So... 💕
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Question Section */}
          {currentStep === 'question' && (
            <motion.div
              key="question"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center space-y-8"
            >
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-pink-600">🌹 So, Adhelia…</h2>
                <div className="space-y-4">
                  <p className="text-2xl text-pink-700 leading-relaxed">
                    Would you like to be someone more than just a friend to me?
                  </p>
                  <p className="text-2xl text-pink-700 leading-relaxed font-semibold">
                    Would you like to be my girlfriend? 💕
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => handleResponse('yes')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 min-w-[200px]"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(236, 72, 153, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  💖 "Iyaa banget!"
                </motion.button>
                <motion.button
                  onClick={() => handleResponse('maybe')}
                  className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 min-w-[200px]"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  😏 "Iya biasa aja sih"
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Response Section */}
          {currentStep === 'response' && (
            <motion.div
              key="response"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center space-y-8"
            >
              {response === 'yes' && (
                <motion.div
                  className="space-y-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <Heart className="w-24 h-24 text-pink-500 mx-auto" fill="currentColor" />
                  </motion.div>
                  <h2 className="text-4xl font-bold text-pink-600">Yeeey! 🎉</h2>
                  <p className="text-2xl text-pink-700 leading-relaxed">
                    Aku juga iyaa banget sama kamu! 💕
                  </p>
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-200 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-pink-800 text-lg">
                      Thank you for making me the happiest person today! ✨
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {response === 'maybe' && (
                <motion.div
                  className="space-y-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-6xl">😏</span>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-pink-600">Hehe 💕</h2>
                  <div className="space-y-4">
                    <p className="text-2xl text-pink-700 leading-relaxed">
                      Eits, walaupun 'biasa aja',
                    </p>
                    <p className="text-2xl text-pink-700 leading-relaxed font-semibold">
                      tetep aja artinya iya kan? Hehe 💕
                    </p>
                  </div>
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-200 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-pink-800 text-lg">
                      I'll take that as a sweet yes! 😊✨
                    </p>
                  </motion.div>
                </motion.div>
              )}

              <motion.button
                onClick={() => {
                  setCurrentStep('opening');
                  setResponse(null);
                  setShowReasons([false, false, false]);
                }}
                className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Start Over 🔄
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;