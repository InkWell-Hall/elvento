
import React, { useState } from 'react';
import { Star, MapPin, Heart, MessageCircle, Phone, ShoppingCart, Send, Mail, Clock, Award } from 'lucide-react';

const VendorShopPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isFollowing, setIsFollowing] = useState(false);
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Sample vendor data
  const vendor = {
    name: "Gela's Crafts",
    bio: "Creating beautiful handmade treasures with passion and care ✨",
    rating: 4.8,
    reviews: 230,
    location: "Accra, Ghana",
    verified: true,
    joinedDate: "2020"
  };

  // Sample products
  const products = [
    {
      id: 1,
      name: "Handwoven Basket",
      price: 45.00,
      originalPrice: 55.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      isNew: true,
      rating: 4.9,
      sales: 156
    },
    {
      id: 2,
      name: "Ceramic Bowl Set",
      price: 78.50,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      isNew: false,
      rating: 4.7,
      sales: 89
    },
    {
      id: 3,
      name: "Abstract Wall Art",
      price: 32.00,
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop",
      isNew: true,
      rating: 4.8,
      sales: 234
    },
    {
      id: 4,
      name: "Wooden Jewelry Box",
      price: 55.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      isNew: false,
      rating: 4.6,
      sales: 67
    },
    {
      id: 5,
      name: "Macrame Wall Hanging",
      price: 28.00,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      isNew: true,
      rating: 4.9,
      sales: 145
    },
    {
      id: 6,
      name: "Decorative Vase",
      price: 42.00,
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop",
      isNew: false,
      rating: 4.5,
      sales: 78
    }
  ];

  // Sample reviews
  const reviews = [
    { 
      user: "Sarah Mitchell", 
      rating: 5, 
      comment: "Absolutely stunning craftsmanship! The attention to detail is incredible and it arrived perfectly packaged. Will definitely order again!", 
      date: "2 weeks ago",
      verified: true,
      product: "Handwoven Basket"
    },
    { 
      user: "John Davis", 
      rating: 4, 
      comment: "Great quality and beautiful design. Shipping was fast and communication was excellent throughout the process.", 
      date: "1 month ago",
      verified: true,
      product: "Ceramic Bowl Set"
    },
    { 
      user: "Maria Rodriguez", 
      rating: 5, 
      comment: "These handmade pieces are truly works of art. The colors and textures are even more beautiful in person!", 
      date: "3 weeks ago",
      verified: true,
      product: "Abstract Wall Art"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessageForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitMessage = () => {
    if (!messageForm.name.trim() || !messageForm.email.trim() || !messageForm.message.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    alert(`Message sent to ${vendor.name}!\n\nName: ${messageForm.name}\nEmail: ${messageForm.email}\nMessage: ${messageForm.message}`);
    
    setMessageForm({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleCall = () => {
    alert('Calling +233 XX XXX XXXX');
  };

  const handleDirectMessage = () => {
    alert('Opening chat with ' + vendor.name);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12">
            
            {/* Vendor Image */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop&crop=face"
                alt={vendor.name}
                className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              {vendor.verified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
              )}
            </div>
            
            {/* Vendor Info */}
            <div className="flex-1 text-center lg:text-left text-white">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">{vendor.name}</h1>
                {vendor.verified && (
                  <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    VERIFIED
                  </div>
                )}
              </div>
              
              <p className="text-blue-100 mb-4 text-sm sm:text-base lg:text-lg max-w-2xl">{vendor.bio}</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-6">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  {renderStars(vendor.rating)}
                  <span className="ml-2 font-semibold">{vendor.rating}</span>
                  <span className="ml-1 text-blue-100">({vendor.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-blue-100 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {vendor.location}
                </div>
                <div className="text-blue-100 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  Since {vendor.joinedDate}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                    isFollowing 
                      ? 'bg-white/20 text-white border-2 border-white/30 hover:bg-white/30' 
                      : 'bg-white text-blue-600 hover:bg-blue-50 shadow-xl'
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button 
                  onClick={handleDirectMessage}
                  className="flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Message
                </button>
                <button 
                  onClick={handleCall}
                  className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-8 overflow-x-auto">
            {[
              { key: 'products', label: 'Products', count: products.length },
              { key: 'reviews', label: 'Reviews', count: reviews.length },
              { key: 'contact', label: 'Contact' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative py-4 px-4 sm:px-6 font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="capitalize">{tab.label}</span>
                {tab.count && (
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h2>
              <div className="text-sm text-gray-500">
                {products.length} items available
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {products.map(product => (
                <div key={product.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          NEW
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-gradient-to-r from-red-400 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          SALE
                        </span>
                      )}
                    </div>

                    {/* Quick View Button */}
                    <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(product.rating)}
                      <span className="text-sm text-gray-500">({product.sales} sold)</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <ShoppingCart className="w-4 h-4 inline mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Average rating: {vendor.rating}/5</span>
                <span>•</span>
                <span>{vendor.reviews} total reviews</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                      {review.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <h3 className="font-bold text-gray-900">{review.user}</h3>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Verified Purchase
                          </span>
                        )}
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-600">for {review.product}</span>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions about our products or want to discuss a custom order? We'd love to hear from you!
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Send Message</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={messageForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={messageForm.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Your Message</label>
                    <textarea 
                      rows="5" 
                      name="message"
                      value={messageForm.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your inquiry or custom order requirements..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none transition-all duration-300"
                    ></textarea>
                  </div>
                  
                  <button 
                    onClick={handleSubmitMessage}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5 inline mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-6">
                {/* Contact Details Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Contact Details</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a 
                          href="mailto:gela.crafts@email.com"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          gela.crafts@email.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <Phone className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <a 
                          href="tel:+233XXXXXXXX"
                          className="text-green-600 hover:text-green-800 transition-colors"
                        >
                          +233 XX XXX XXXX
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">{vendor.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Business Hours</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                      { days: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                      { days: 'Sunday', hours: 'Closed' }
                    ].map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-900">{schedule.days}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorShopPage;