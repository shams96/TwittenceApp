import React, { useState } from 'react';
    import { Link } from 'react-router-dom';

    const PricingCard = ({ plan, isPopular }) => (
      <div className={`bg-white rounded-lg p-8 ${
        isPopular ? 'shadow-xl border-2 border-purple-600 relative' : 'shadow-lg'
      }`}>
        {isPopular && (
          <span className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-sm rounded-bl-lg">
            Popular
          </span>
        )}
        <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-gray-600">/month</span>
        </div>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <button className={`w-full py-2 rounded-lg transition-colors duration-200 ${
          isPopular 
            ? 'bg-purple-600 text-white hover:bg-purple-700' 
            : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
        }`}>
          {plan.buttonText}
        </button>
      </div>
    );

    export default function HomePage() {
      const [selectedPlan, setSelectedPlan] = useState('monthly');
      const [searchQuery, setSearchQuery] = useState('');
      const [isSearchFocused, setIsSearchFocused] = useState(false);

      const plans = {
        monthly: [
          {
            name: 'Basic',
            price: '$29',
            description: 'Perfect for getting started',
            features: [
              '5 Trend Analysis/month',
              'Basic Analytics',
              'Email Support'
            ],
            buttonText: 'Get Started'
          },
          {
            name: 'Pro',
            price: '$79',
            description: 'For growing businesses',
            features: [
              'Unlimited Trend Analysis',
              'Advanced Analytics',
              'Priority Support',
              'API Access'
            ],
            buttonText: 'Get Started'
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            description: 'For large organizations',
            features: [
              'Custom Solutions',
              'Dedicated Support',
              'Custom Integration',
              'Advanced API Access',
              'Custom Reporting'
            ],
            buttonText: 'Contact Sales'
          }
        ],
        annual: [
          {
            name: 'Basic',
            price: '$23',
            description: 'Perfect for getting started',
            features: [
              '5 Trend Analysis/month',
              'Basic Analytics',
              'Email Support'
            ],
            buttonText: 'Get Started'
          },
          {
            name: 'Pro',
            price: '$63',
            description: 'For growing businesses',
            features: [
              'Unlimited Trend Analysis',
              'Advanced Analytics',
              'Priority Support',
              'API Access'
            ],
            buttonText: 'Get Started'
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            description: 'For large organizations',
            features: [
              'Custom Solutions',
              'Dedicated Support',
              'Custom Integration',
              'Advanced API Access',
              'Custom Reporting'
            ],
            buttonText: 'Contact Sales'
          }
        ]
      };

      return (
        <div>
          {/* Hero Section */}
          <section className="bg-purple-700 text-white py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Get measurable results<br />
                    from trend analysis
                  </h1>
                  <p className="text-lg mb-8 text-purple-100">
                    Do SEO, content marketing, competitor research, and social media trending<br />
                    analysis all on one platform.
                  </p>
                  <div className="relative mb-8">
                    <input
                      type="text"
                      placeholder="Enter your trend topic..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className={`w-full px-4 py-3 rounded-lg text-gray-900 transition-shadow duration-200 ${
                        isSearchFocused ? 'shadow-lg' : 'shadow'
                      }`}
                    />
                    <button className="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Start now
                    </button>
                  </div>
                  <p className="text-sm text-purple-200 mb-4">
                    Trusted by the world's leading brands
                  </p>
                  <div className="flex gap-6">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        src={`https://via.placeholder.com/120x40/ffffff/666666?text=Brand+${i}`}
                        alt={`Trusted brand ${i}`}
                        className="h-10 opacity-75 hover:opacity-100 transition-opacity duration-200"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg p-6 text-gray-900 shadow-xl">
                    <h3 className="font-semibold mb-6">See what's inside</h3>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { name: 'Trend Analysis', color: 'blue' },
                        { name: 'Content Gen', color: 'green' },
                        { name: 'Analytics', color: 'purple' }
                      ].map((feature, index) => (
                        <div key={index} className="text-center group cursor-pointer">
                          <div className={`w-12 h-12 bg-${feature.color}-100 rounded-full mx-auto mb-2 group-hover:bg-${feature.color}-200 transition-colors duration-200`}></div>
                          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                      <img 
                        src="https://via.placeholder.com/600x300" 
                        alt="Dashboard preview" 
                        className="w-full rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Pricing Plans</h2>
                <p className="text-gray-600 mb-8">Choose the perfect plan for your needs</p>
                <div className="flex justify-center items-center gap-8 mb-12">
                  <span className={`transition-colors duration-200 ${
                    selectedPlan === 'monthly' ? 'text-purple-600' : 'text-gray-600'
                  }`}>
                    Monthly
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={selectedPlan === 'annual'}
                      onChange={() => setSelectedPlan(selectedPlan === 'monthly' ? 'annual' : 'monthly')}
                    />
                    <div className="w-14 h-7 bg-purple-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-purple-600 after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                  </label>
                  <div>
                    <span className={`transition-colors duration-200 ${
                      selectedPlan === 'annual' ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      Annual
                    </span>
                    <span className="ml-2 text-sm text-green-500">Save 20%</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {plans[selectedPlan].map((plan, index) => (
                    <PricingCard 
                      key={index}
                      plan={plan}
                      isPopular={index === 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">
                  Explore Our Powerful Features
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Discover how Twittence can help you stay ahead of the trends
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Real-time Trend Analysis',
                    description: 'Get instant insights into trending topics as they emerge.',
                    icon: 'https://via.placeholder.com/80/40/0000FF/FFFFFF?text=RT'
                  },
                  {
                    title: 'AI-Powered Content Generation',
                    description: 'Generate optimized content with our advanced AI algorithms.',
                    icon: 'https://via.placeholder.com/80/40/008000/FFFFFF?text=AI'
                  },
                  {
                    title: 'Advanced Analytics',
                    description: 'Track performance and optimize your content strategy with detailed analytics.',
                    icon: 'https://via.placeholder.com/80/40/800080/FFFFFF?text=AA'
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-200">
                    <img src={feature.icon} alt={feature.title} className="w-12 h-12 mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">
                  What Our Users Say
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  See how Twittence has helped others achieve their goals
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    quote: 'Twittence has transformed our content strategy. We now create content that truly resonates with our audience.',
                    author: 'John Smith',
                    title: 'Marketing Director, Tech Corp',
                    image: 'https://via.placeholder.com/80/80/000000/FFFFFF?text=JS'
                  },
                  {
                    quote: 'The AI-powered content generation is a game-changer. We save so much time and effort.',
                    author: 'Jane Doe',
                    title: 'Content Manager, Media Inc',
                    image: 'https://via.placeholder.com/80/80/000000/FFFFFF?text=JD'
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-200">
                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <h4 className="font-semibold">{testimonial.author}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Get answers to common questions about Twittence
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    question: 'What is Twittence?',
                    answer: 'Twittence is a platform that provides real-time trend analysis and AI-powered content generation tools.'
                  },
                  {
                    question: 'How does the AI content generation work?',
                    answer: 'Our AI algorithms analyze trending topics and generate optimized content based on those trends.'
                  },
                  {
                    question: 'What kind of analytics do you provide?',
                    answer: 'We provide detailed analytics on content performance, engagement, and SEO ranking.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-200">
                    <h4 className="text-xl font-semibold mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      );
    }
