import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import fullLogo from '../assets/Images/fulllogo.png';
import apImage from '../assets/Images/AP.png';
import image1 from '../assets/media/image1.png';
import image2 from '../assets/media/image2.png';
import image3 from '../assets/media/image3.png';
import jsImage from '../assets/media/JS.jpg';

const Posts = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', description: '', category: 'Development', imageFile: null, imagePreview: null, content: '' });
  const [detailPost, setDetailPost] = useState(null);
  const profileRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const togglePlanSubmenu = () => {
    setPlanExpanded(!planExpanded);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sidebarWidthPx = sidebarExpanded ? 200 : 60;

  // Sample posts data with media
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Development Progress Update",
      description: "Latest updates on infrastructure development in our constituency. Major road construction projects are progressing well.",
      content: "Road-widening on the NH stretch has reached 72% completion with quality checks conducted on each segment. Drainage and pedestrian pathways are being added alongside to improve safety and accessibility. In addition, new street lighting is being deployed on major junctions. Contractors have been instructed to avoid peak-hour blockage, and an on-ground monitoring team is publishing weekly progress notes.",
      image: image1,
      category: "Development",
      date: "2025-01-10",
      // likes: 45,
      // comments: 12,
      author: "Bolisetti Team"
    },
    {
      id: 2,
      title: "Community Health Initiative",
      description: "New health camps organized across various villages. Free medical checkups and awareness programs conducted successfully.",
      content: "The outreach covered general checkups, dental camps, and eye screening. Over 1,200 beneficiaries were served. Chronic patients have been enrolled for follow-up at PHCs. Health educators conducted sessions on nutrition, maternal care, and lifestyle disorders. A consolidated report will guide next month’s mobile clinic schedule.",
      image: image2,
      category: "Health",
      date: "2025-01-08",
      // likes: 38,
      // comments: 8,
      author: "Health Department"
    },
    {
      id: 3,
      title: "Education Enhancement Program",
      description: "Digital learning initiatives launched in local schools. New computer labs and smart classrooms established.",
      content: "Smart-class infrastructure has been installed across 14 schools, with teacher training completed in two phases. The labs host 30 systems each, connected via filtered internet, and include content repositories aligned with the state syllabus. Maintenance MoUs were signed to ensure uptime and safety audits.",
      image: image3,
      category: "Education",
      date: "2025-01-05",
      likes: 52,
      comments: 15,
      author: "Education Board"
    },
    {
      id: 4,
      title: "Agricultural Support Scheme",
      description: "New farming techniques and modern equipment distribution program. Farmers trained on sustainable agriculture practices.",
      content: "Hands-on demonstrations on drip irrigation, mulching, and shade-net cultivation were organized. Subsidized equipment distribution will start next week. Soil testing counters are being set up to tailor crop patterns based on local profiling.",
      image: jsImage,
      category: "Agriculture",
      date: "2025-01-03",
      likes: 29,
      comments: 6,
      author: "Agriculture Department"
    }
  ]);

  const categories = ['All', 'Development', 'Health', 'Education', 'Agriculture'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleNewPostImage = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setNewPost(prev => ({ ...prev, imageFile: file, imagePreview: reader.result }));
    reader.readAsDataURL(file);
  };

  const addPost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.description.trim() || !newPost.category) return;
    const created = {
      id: Date.now(),
      title: newPost.title.trim(),
      description: newPost.description.trim(),
      content: (newPost.content && newPost.content.trim()) || newPost.description.trim(),
      image: newPost.imagePreview || image1,
      category: newPost.category,
      date: new Date().toISOString(),
      likes: 0,
      comments: 0,
      author: 'Bolisetti Team'
    };
    setPosts(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewPost({ title: '', description: '', category: 'Development', imageFile: null, imagePreview: null, content: '' });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-[Inter,Segoe_UI,Tahoma,Geneva,Verdana,sans-serif]">
      {/* Header */}
      <header
        className="fixed top-0 right-0 h-[60px] flex items-center justify-between px-6 bg-white/80 shadow z-[1000] transition-all"
        style={{ left: sidebarWidthPx }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <img src={fullLogo} alt="Logo" className="w-[200px] h-auto object-contain" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer rounded-md transition relative hover:bg-white/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white/80"></div>
          </div>
          <div
            className="w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer rounded-md transition relative hover:bg-white/10"
            onClick={toggleProfileDropdown}
            ref={profileRef}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            {showProfileDropdown && (
              <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-[1000] mt-2 min-w-48 overflow-hidden">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>My Profile</span>
                </Link>
                <Link to="/posts" className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                  <span>My Posts</span>
                </Link>
                <div className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span>Settings</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen bg-amber-400 z-[1001] transition-all flex flex-col" style={{ width: sidebarWidthPx }}>
        <div className="p-4 cursor-pointer flex flex-col gap-1 items-center justify-center border-b border-black/10" onClick={toggleSidebar}>
          <div className="w-5 h-0.5 bg-gray-800"></div>
          <div className="w-5 h-0.5 bg-gray-800"></div>
          <div className="w-5 h-0.5 bg-gray-800"></div>
        </div>
        <nav className={"flex-1 flex flex-col py-4 space-y-1 " + (sidebarExpanded ? "items-stretch px-3" : "items-center") }>
          <Link to="/dashboard" className={(sidebarExpanded?"flex justify-start gap-3 w-full ":"w-12 h-12 flex items-center justify-center ") + " text-gray-800 hover:bg-white/20 rounded-lg transition-colors px-3 py-2"}>
            <svg width={sidebarExpanded?"22":"22"} height={sidebarExpanded?"22":"22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={sidebarExpanded?"mt-[2px]":""}>
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            {sidebarExpanded && <span className="text-sm font-medium">Dashboard</span>}
          </Link>
          <Link to="/users" className={(sidebarExpanded?"flex justify-start gap-3 w-full ":"w-12 h-12 flex items-center justify-center ") + " text-gray-800 hover:bg-white/20 rounded-lg transition-colors px-3 py-2"}>
            <svg width={sidebarExpanded?"22":"22"} height={sidebarExpanded?"22":"22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={sidebarExpanded?"mt-[2px]":""}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {sidebarExpanded && <span className="text-sm font-medium">Manage Users</span>}
          </Link>
          <Link to="/grievances" className={(sidebarExpanded?"flex justify-start gap-3 w-full ":"w-12 h-12 flex items-center justify-center ") + " text-gray-800 hover:bg-white/20 rounded-lg transition-colors px-3 py-2"}>
            <svg width={sidebarExpanded?"22":"22"} height={sidebarExpanded?"22":"22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={sidebarExpanded?"mt-[2px]":""}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
            </svg>
            {sidebarExpanded && <span className="text-sm font-medium">Grievances</span>}
          </Link>
          <Link to="/schedule" className={(sidebarExpanded?"flex items-center justify-between w-full ":"w-12 h-12 flex items-center justify-center ") + " text-gray-800 hover:bg-white/20 rounded-lg transition-colors px-3 py-2"}>
            <div className={sidebarExpanded?"flex items-center gap-3":""}>
              <svg width={sidebarExpanded?"22":"22"} height={sidebarExpanded?"22":"22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={sidebarExpanded?"mt-[2px]":""}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {sidebarExpanded && <span className="text-sm font-medium">Plan</span>}
            </div>
            {sidebarExpanded && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-800">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            )}
          </Link>
          <Link to="/development" className={(sidebarExpanded?"flex justify-start gap-3 w-full ":"w-12 h-12 flex items-center justify-center ") + " text-gray-800 hover:bg-white/20 rounded-lg transition-colors px-3 py-2"}>
            <svg width={sidebarExpanded?"22":"22"} height={sidebarExpanded?"22":"22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={sidebarExpanded?"mt-[2px]":""}>
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            {sidebarExpanded && <span className="text-sm font-medium">Development</span>}
          </Link>

          {/* Spacer to push logout to bottom */}
          <div className="flex-1"></div>

          {/* Logout */}
          <button type="button" className={(sidebarExpanded?"flex justify-start gap-3 w-full ":"w-12 h-12 flex items-center justify-center ") + " text-gray-800 hover:bg-white/20 rounded-lg transition-colors px-3 py-2 mb-4"}>
            <svg width={sidebarExpanded?"22":"22"} height={sidebarExpanded?"22":"22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={sidebarExpanded?"mt-[2px]":""}>
              <path d="M10 17l5-5-5-5"></path>
              <path d="M15 12H3"></path>
              <path d="M21 21V3a2 2 0 0 0-2-2h-6"></path>
            </svg>
            {sidebarExpanded && <span className="text-sm font-medium">Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="relative z-[1] min-h-screen p-6 pt-12 transition-all" style={{ marginLeft: sidebarWidthPx, backgroundImage: `url(${apImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="p-0">
          {/* Page Header */}
          <div className="mt-4 mb-3">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">My Posts</h1>
            <p className="text-gray-600 m-0">Manage and view your published content</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center rounded-md px-3 py-2 bg-white border border-gray-300 shadow-sm" style={{ width: '320px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 mr-2 shrink-0">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search posts..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 outline-none text-sm text-gray-700 bg-transparent w-full placeholder:text-gray-400" 
                />
              </div>
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Filter
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="ml-auto px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors shadow"
              >
                + Add Post
              </button>
            </div>

            {/* Filter Options */}
            {showFilter && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-white flex items-center justify-center">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span className="text-sm text-gray-600">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span className="text-sm text-gray-600">{post.comments}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm" onClick={()=>setDetailPost(post)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400 mx-auto mb-4">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>

      {/* Add Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl w-[92%] max-w-[640px] shadow-2xl overflow-hidden" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Add Post</h3>
              <button className="p-2 rounded text-gray-500 hover:bg-gray-100" onClick={()=>setShowAddModal(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={addPost} className="px-6 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <input name="title" value={newPost.title} onChange={handleNewPostChange} type="text" placeholder="Post title" className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                  <select name="category" value={newPost.category} onChange={handleNewPostChange} className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700">
                    {categories.filter(c=>c!=='All').map(c => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Image</label>
                  <input type="file" accept="image/*" onChange={handleNewPostImage} className="block w-full text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Short Description</label>
                  <textarea name="description" value={newPost.description} onChange={handleNewPostChange} rows={3} placeholder="Write a short description" className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" required></textarea>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Detailed Content</label>
                  <textarea name="content" value={newPost.content || ''} onChange={handleNewPostChange} rows={5} placeholder="Provide full details for View Details modal" className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700"></textarea>
                </div>
                {newPost.imagePreview && (
                  <div className="sm:col-span-2">
                    <img src={newPost.imagePreview} alt="preview" className="w-full h-40 object-cover rounded-md" />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" className="px-5 py-2.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={()=>setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700">Add Post</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {detailPost && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]" onClick={()=>setDetailPost(null)}>
          <div className="bg-white rounded-xl w-[94%] max-w-[900px] shadow-2xl overflow-hidden" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{detailPost.title}</h3>
              <button className="p-2 rounded text-gray-500 hover:bg-gray-100" onClick={()=>setDetailPost(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4">
                <img src={detailPost.image} alt={detailPost.title} className="w-40 h-28 object-contain bg-white rounded-md shadow" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[11px]">{detailPost.category}</span>
                    <span>•</span>
                    <span>{new Date(detailPost.date).toLocaleString()}</span>
                    <span>•</span>
                    <span className="font-medium text-gray-700">{detailPost.author}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {detailPost.content || detailPost.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  <span>{detailPost.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  <span>{detailPost.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
