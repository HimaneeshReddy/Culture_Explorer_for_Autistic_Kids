import React, { useState, useEffect } from 'react';
import { Sparkles, Home, Shirt, UtensilsCrossed, PartyPopper, Users, Award, ArrowRight, ArrowLeft, RotateCcw, Settings, Volume2, VolumeX, Zap, ZapOff, Menu } from 'lucide-react';
import kurta from "./assets/Visuals/kurta.png";
import saree from "./assets/Visuals/saree.jpg";
const CultureExplorer = () => {
  const [currentModule, setCurrentModule] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [animation, setAnimation] = useState('');
  
  // Settings for autism-friendly features
  const [settings, setSettings] = useState({
    animationsEnabled: true,
    soundEnabled: false,
    calmMode: false,
    showProgress: true
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Data structure for all modules
  const modules = {
    greeting: {
      title: "🙏 Greeting: Namaste",
      icon: Sparkles,
      bgColor: "#fed7aa",
      borderColor: "#fdba74",
      slides: [
        {
          title: "How to Say Hello!",
          content: "In India, we greet people by saying 'Namaste' (nuh-muh-stay)",
          animation: "hands",
          visual: "👏"
        },
        {
          title: "How to Do Namaste",
          content: "Press your hands together in front of your chest and bow your head slightly",
          animation: "bow",
          visual: "🙏"
        },
        {
          title: "When to Use It",
          content: "Say Namaste when you meet elders, teachers, or friends!",
          animation: "wave",
          visual: "👋"
        }
      ]
    },
    clothes: {
      title: "👕 Traditional Clothes",
      icon: Shirt,
      bgColor: "#fbcfe8",
      borderColor: "#f9a8d4",
      slides: [
        {
          title: "Saree - Women's Dress",
          content: "A saree is a long, colorful cloth that women wrap around themselves",
          animation: "spin",
          visual: <div>
      <img src={saree} alt="Saree" />
    </div>
        },
        {
          title: "Kurta - For Everyone",
          content: "A kurta is a comfortable, long shirt worn by both men and women",
          animation: "pulse",
          visual: <div>
      <img src={kurta} alt="Kurta" />
    </div>
        }
      ]
    },
    food: {
      title: "🍛 Indian Food",
      icon: UtensilsCrossed,
      bgColor: "#fef3c7",
      borderColor: "#fde047",
      slides: [
        {
          title: "Rice - Staple Food",
          content: "White rice is eaten with almost every meal in many Indian homes",
          animation: "bounce",
          visual: "🍚"
        },
        {
          title: "Dal - Lentil Soup",
          content: "Dal is a warm, tasty soup made from lentils. It's healthy and yummy!",
          animation: "steam",
          visual: "🥘"
        },
        {
          title: "Roti - Flatbread",
          content: "Roti is a round, flat bread. You can tear it and scoop up food with it!",
          animation: "flip",
          visual: "🫓"
        }
      ]
    },
    festivals: {
      title: "🎉 Festivals",
      icon: PartyPopper,
      bgColor: "#e9d5ff",
      borderColor: "#d8b4fe",
      slides: [
        {
          title: "Diwali - Festival of Lights",
          content: "Diwali celebrates the victory of light over darkness. Families light diyas (small lamps)!",
          animation: "diya",
          visual: "🪔"
        },
        {
          title: "Holi - Festival of Colors",
          content: "Holi is a fun festival where people play with colored powder and water!",
          animation: "colors",
          visual: "🎨"
        },
        {
          title: "Pongal - Harvest Festival",
          content: "Pongal is a harvest festival where people thank the Sun God for good crops. They cook sweet rice!",
          animation: "bounce",
          visual: "🌾"
        },
        {
          title: "Bhogi - New Beginnings",
          content: "Bhogi is the first day of Pongal. People light bonfires and throw away old things to start fresh!",
          animation: "diya",
          visual: "🔥"
        },
        {
          title: "Onam - Kerala's Harvest",
          content: "Onam is celebrated in Kerala with flower carpets, boat races, and delicious feasts!",
          animation: "pulse",
          visual: "🌺"
        },
        {
          title: "Navratri - Nine Nights of Dance",
          content: "Navratri celebrates the divine feminine with nine nights of dancing, music, and colorful garba!",
          animation: "spin",
          visual: "💃"
        },
        {
          title: "Raksha Bandhan - Brother-Sister Love",
          content: "Sisters tie a special thread (rakhi) on their brothers' wrists as a symbol of love and protection!",
          animation: "pulse",
          visual: "🎀"
        },
        {
          title: "Eid - Festival of Joy",
          content: "Eid is celebrated after Ramadan with prayers, delicious sweets, and giving to those in need!",
          animation: "bounce",
          visual: "🌙"
        }
      ]
    },
    home: {
      title: "🏠 Indian Homes",
      icon: Home,
      bgColor: "#bbf7d0",
      borderColor: "#86efac",
      slides: [
        {
          title: "Joint Family",
          content: "Many Indian families live together - grandparents, parents, children, uncles, and aunts all in one home!",
          animation: "family",
          visual: "👨‍👩‍👧‍👦"
        },
        {
          title: "Daily Routine",
          content: "Wake up → Pray → Breakfast → School/Play → Lunch → Rest → Evening prayer → Dinner → Sleep",
          animation: "routine",
          visual: "⏰"
        }
      ]
    }
  };

  const allQuizData = [
    {
      festival: "Diwali",
      emoji: "🪔",
      matches: ["Lights", "Diyas", "Lamps"],
      description: "Festival of Lights"
    },
    {
      festival: "Holi",
      emoji: "🎨",
      matches: ["Colors", "Powder", "Water"],
      description: "Festival of Colors"
    },
    {
      festival: "Pongal",
      emoji: "🌾",
      matches: ["Harvest", "Rice", "Gratitude"],
      description: "Harvest Festival"
    },
    {
      festival: "Bhogi",
      emoji: "🔥",
      matches: ["Bonfire", "Old things", "New beginning"],
      description: "First day of Pongal"
    },
    {
      festival: "Onam",
      emoji: "🌺",
      matches: ["Flowers", "Boat race", "Kerala"],
      description: "Harvest Festival of Kerala"
    },
    {
      festival: "Navratri",
      emoji: "💃",
      matches: ["Dance", "Nine nights", "Garba"],
      description: "Nine Nights Festival"
    },
    {
      festival: "Raksha Bandhan",
      emoji: "🎀",
      matches: ["Siblings", "Thread", "Protection"],
      description: "Brother-Sister Festival"
    },
    {
      festival: "Eid",
      emoji: "🌙",
      matches: ["Moon", "Prayers", "Sweets"],
      description: "Festival after Ramadan"
    }
  ];

  const [quizData, setQuizData] = useState([]);
  const [matchingItems, setMatchingItems] = useState([]);

  // Select random 2 questions when component mounts or quiz resets
  useEffect(() => {
    selectRandomQuestions();
  }, []);

  const selectRandomQuestions = () => {
    const shuffled = [...allQuizData].sort(() => Math.random() - 0.5);
    setQuizData(shuffled.slice(0, 2));
  };

  // Update matching items when quiz questions change
  useEffect(() => {
    if (quizData.length > 0) {
      const allOptions = quizData.flatMap(q => q.matches);
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
      setMatchingItems(shuffledOptions.map((text, idx) => ({ id: idx, text, matched: false })));
    }
  }, [quizData]);

  const handleModuleClick = (moduleName) => {
    setCurrentModule(moduleName);
    setCurrentSlide(0);
    setShowMenu(false);
    if (settings.animationsEnabled) {
      setAnimation('slideIn');
      setTimeout(() => setAnimation(''), 500);
    }
  };

  const nextSlide = () => {
    const totalSlides = modules[currentModule].slides.length;
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
      setAnimation('slideIn');
      setTimeout(() => setAnimation(''), 500);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setAnimation('slideIn');
      setTimeout(() => setAnimation(''), 500);
    }
  };

  const handleQuizAnswer = (festivalName, answer) => {
    setQuizAnswers({ ...quizAnswers, [festivalName]: answer });
  };

  const submitQuiz = () => {
    let correctAnswers = 0;
    quizData.forEach(q => {
      if (quizAnswers[q.festival] && q.matches.includes(quizAnswers[q.festival])) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
    selectRandomQuestions();
  };

  const AnimatedVisual = ({ visual, animationType, colors }) => {
    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    useEffect(() => {
      if (animationType === 'colors') {
        const interval = setInterval(() => {
          setCurrentColorIndex((prev) => (prev + 1) % 5);
        }, 500);
        return () => clearInterval(interval);
      }
    }, [animationType]);

    const getAnimationClass = () => {
      switch(animationType) {
        case 'hands':
          return 'animate-pulse';
        case 'bow':
          return 'animate-bounce';
        case 'wave':
          return 'animate-pulse';
        case 'spin':
          return 'animate-spin';
        case 'pulse':
          return 'animate-pulse';
        case 'bounce':
          return 'animate-bounce';
        case 'diya':
          return 'animate-pulse';
        case 'colors':
          return 'animate-bounce';
        case 'family':
          return 'animate-pulse';
        default:
          return '';
      }
    };

    if (animationType === 'diya') {
      return (
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '144px' }} className="animate-pulse">{visual}</div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-ping"
                style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#facc15',
                  borderRadius: '50%',
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (animationType === 'colors') {
      const colorVals = ['#f87171', '#facc15', '#4ade80', '#60a5fa', '#c084fc'];
      return (
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '144px' }} className="animate-bounce">{visual}</div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {colorVals.map((color, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  opacity: 0.6,
                  transition: 'all 0.5s',
                  transform: `translate(${Math.cos(i * 72 * Math.PI / 180) * (currentColorIndex === i ? 100 : 80)}px, ${Math.sin(i * 72 * Math.PI / 180) * (currentColorIndex === i ? 100 : 80)}px) scale(${currentColorIndex === i ? 1.2 : 1})`
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (animationType === 'spin' && colors) {
      return (
        <div style={{ position: 'relative', width: '192px', height: '192px', margin: '0 auto' }}>
          {colors.map((color, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: color,
                borderRadius: '50%',
                opacity: 0.4,
                animation: `spin ${3 + i}s linear infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '72px' }}>
            {visual}
          </div>
        </div>
      );
    }

    return <div style={{ fontSize: '144px' }} className={getAnimationClass()}>{visual}</div>;
  };

  const currentModuleData = modules[currentModule];
  const currentSlideData = currentModuleData.slides[currentSlide];

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      background: 'linear-gradient(to bottom right, #ffedd5, #fef3c7, #fce7f3)',
      padding: '16px',
      colorScheme: 'light',
      boxSizing: 'border-box'
    }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '40px', 
            fontWeight: 'bold', 
            color: '#ea580c',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <Sparkles style={{ width: '40px', height: '40px' }} />
            Discover India!
            <Sparkles style={{ width: '40px', height: '40px' }} />
          </h1>
          <p style={{ fontSize: '18px', color: '#374151' }}>Learn about Indian culture in a fun way!</p>
        </div>

        {/* Module Selection */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginBottom: '32px'
        }}>
          {Object.entries(modules).map(([key, module]) => {
            const IconComponent = module.icon;
            return (
              <button
                key={key}
                onClick={() => handleModuleClick(key)}
                style={{
                  backgroundColor: module.bgColor,
                  border: `4px solid ${module.borderColor}`,
                  borderRadius: '24px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  outline: currentModule === key ? '4px solid #fb923c' : 'none',
                  transform: currentModule === key ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: currentModule === key ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (currentModule !== key) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentModule !== key) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <IconComponent style={{ width: '48px', height: '48px', margin: '0 auto 12px', display: 'block', color: '#374151' }} />
                <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#1f2937', textAlign: 'center' }}>
                  {module.title.split(':')[1] || module.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Content Display */}
        <div style={{
          backgroundColor: currentModuleData.bgColor,
          border: `4px solid ${currentModuleData.borderColor}`,
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          minHeight: '384px',
          transition: 'all 0.5s'
        }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px', textAlign: 'center' }}>
            {currentSlideData.title}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
            <AnimatedVisual 
              visual={currentSlideData.visual} 
              animationType={currentSlideData.animation}
              colors={currentSlideData.colors}
            />
            
            <p style={{ fontSize: '24px', color: '#374151', textAlign: 'center', maxWidth: '672px', lineHeight: '1.75' }}>
              {currentSlideData.content}
            </p>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '48px' }}>
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none',
                cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: currentSlide === 0 ? '#d1d5db' : '#f97316',
                color: currentSlide === 0 ? '#6b7280' : 'white',
                transition: 'all 0.3s'
              }}
            >
              <ArrowLeft style={{ width: '24px', height: '24px' }} />
              Previous
            </button>

            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#374151' }}>
              {currentSlide + 1} / {currentModuleData.slides.length}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === currentModuleData.slides.length - 1}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none',
                cursor: currentSlide === currentModuleData.slides.length - 1 ? 'not-allowed' : 'pointer',
                backgroundColor: currentSlide === currentModuleData.slides.length - 1 ? '#d1d5db' : '#f97316',
                color: currentSlide === currentModuleData.slides.length - 1 ? '#6b7280' : 'white',
                transition: 'all 0.3s'
              }}
            >
              Next
              <ArrowRight style={{ width: '24px', height: '24px' }} />
            </button>
          </div>
        </div>

        {/* Quiz Section */}
        <div style={{ backgroundColor: 'white', border: '4px solid #d8b4fe', borderRadius: '24px', padding: '32px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#9333ea',
            marginBottom: '24px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <Award style={{ width: '40px', height: '40px' }} />
            Festival Quiz!
            <Award style={{ width: '40px', height: '40px' }} />
          </h2>
          
          {!quizSubmitted ? (
            <>
              <p style={{ fontSize: '20px', color: '#374151', marginBottom: '32px', textAlign: 'center' }}>
                Match each festival with what makes it special!
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {quizData.map((item) => (
                  <div key={item.festival} style={{ backgroundColor: '#faf5ff', borderRadius: '16px', padding: '24px', border: '2px solid #e9d5ff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '72px' }}>{item.emoji}</span>
                      <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{item.festival}</h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                      {matchingItems.map((matchItem) => (
                        <button
                          key={matchItem.id}
                          onClick={() => handleQuizAnswer(item.festival, matchItem.text)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            border: quizAnswers[item.festival] === matchItem.text ? 'none' : '2px solid #e9d5ff',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            backgroundColor: quizAnswers[item.festival] === matchItem.text ? '#9333ea' : 'white',
                            color: quizAnswers[item.festival] === matchItem.text ? 'white' : '#374151',
                            transform: quizAnswers[item.festival] === matchItem.text ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: quizAnswers[item.festival] === matchItem.text ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                          }}
                        >
                          {matchItem.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length < quizData.length}
                style={{
                  marginTop: '32px',
                  display: 'block',
                  margin: '32px auto 0',
                  padding: '16px 32px',
                  borderRadius: '9999px',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  border: 'none',
                  cursor: Object.keys(quizAnswers).length < quizData.length ? 'not-allowed' : 'pointer',
                  backgroundColor: Object.keys(quizAnswers).length < quizData.length ? '#d1d5db' : '#9333ea',
                  color: Object.keys(quizAnswers).length < quizData.length ? '#6b7280' : 'white',
                  transition: 'all 0.3s',
                  boxShadow: Object.keys(quizAnswers).length < quizData.length ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                Submit Quiz
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '128px', marginBottom: '24px' }}>
                {score === quizData.length ? '🎉' : score > 0 ? '👍' : '💪'}
              </div>
              <h3 style={{ fontSize: '40px', fontWeight: 'bold', color: '#9333ea', marginBottom: '16px' }}>
                You got {score} out of {quizData.length} correct!
              </h3>
              <p style={{ fontSize: '24px', color: '#374151', marginBottom: '32px' }}>
                {score === quizData.length
                  ? 'Amazing work! You know your festivals!'
                  : score > 0
                  ? 'Good job! Keep learning!'
                  : 'Try again! You can do it!'}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {quizData.map((item) => {
                  const isCorrect = item.matches.includes(quizAnswers[item.festival]);
                  return (
                    <div
                      key={item.festival}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: isCorrect ? '#d1fae5' : '#fee2e2',
                        border: `2px solid ${isCorrect ? '#6ee7b7' : '#fca5a5'}`
                      }}
                    >
                      <p style={{ fontSize: '20px', color: '#1f2937' }}>
                        <span style={{ fontSize: '36px', marginRight: '8px' }}>{item.emoji}</span>
                        <strong>{item.festival}:</strong> {quizAnswers[item.festival]}
                        {isCorrect ? ' ✅' : ` ❌ (Correct: ${item.matches.join(', ')})`}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={resetQuiz}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 auto',
                  padding: '16px 32px',
                  backgroundColor: '#9333ea',
                  color: 'white',
                  borderRadius: '9999px',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <RotateCcw style={{ width: '24px', height: '24px' }} />
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        * {
          color-scheme: light;
        }
      `}</style>
    </div>
  );
};

export default CultureExplorer;
