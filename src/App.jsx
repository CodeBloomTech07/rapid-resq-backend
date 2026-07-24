import React, { useState } from 'react';

export default function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Patient / Citizen'
  });
  const [medicalProfile, setMedicalProfile] = useState({
    age: '',
    gender: 'Male',
    bloodGroup: 'O+',
    allergies: '',
    conditions: '',
    medications: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [triageResult, setTriageResult] = useState(null);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setCurrentView('medical-profile');
  };

  const handleMedicalSubmit = (e) => {
    e.preventDefault();
    setCurrentView('dashboard');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const runTriageAI = () => {
    setTriageResult({
      severity: 'Critical / Golden Hour',
      recommendation: 'Immediate emergency dispatch required. Share medical profile with responders.',
      confidence: '96.4%'
    });
  };

  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative">
        <div className="bg-slate-900/85 border border-slate-700/80 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-6 backdrop-blur-md">
          <div className="space-y-2">
            <span className="text-5xl">🚨</span>
            <h1 className="text-2xl font-bold tracking-tight text-white">Rapid ResQ</h1>
            <p className="text-sm text-slate-300">AI-Based Golden Hour Emergency Response System</p>
          </div>
          <div className="space-y-3 pt-4">
            <button
              onClick={() => setCurrentView('signup')}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-xl shadow transition transform active:scale-95 text-sm"
            >
              Get Started / Register Account
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold py-3 px-4 rounded-xl transition text-sm"
            >
              Skip to Emergency Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'signup') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
          <div className="text-center">
            <span className="text-3xl">📝</span>
            <h2 className="text-xl font-bold mt-2">Create Your Account</h2>
            <p className="text-xs text-slate-400 mt-1">Step 1: Account Credentials</p>
          </div>
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={userData.fullName}
                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={userData.confirmPassword}
                onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl shadow transition text-sm mt-2"
            >
              Continue to Medical Profile ➔
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (currentView === 'medical-profile') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6">
          <div className="text-center">
            <span className="text-3xl">🏥</span>
            <h2 className="text-xl font-bold mt-2">Medical History & Profile</h2>
            <p className="text-xs text-slate-400 mt-1">Step 2: Critical medical data for AI triage matching</p>
          </div>
          <form onSubmit={handleMedicalSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Age</label>
                <input
                  type="number"
                  required
                  value={medicalProfile.age}
                  onChange={(e) => setMedicalProfile({ ...medicalProfile, age: e.target.value })}
                  placeholder="21"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Blood Group</label>
                <select
                  value={medicalProfile.bloodGroup}
                  onChange={(e) => setMedicalProfile({ ...medicalProfile, bloodGroup: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                >
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Allergies</label>
              <input
                type="text"
                value={medicalProfile.allergies}
                onChange={(e) => setMedicalProfile({ ...medicalProfile, allergies: e.target.value })}
                placeholder="e.g., Penicillin, Peanuts"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Chronic Conditions / Medical History</label>
              <input
                type="text"
                value={medicalProfile.conditions}
                onChange={(e) => setMedicalProfile({ ...medicalProfile, conditions: e.target.value })}
                placeholder="e.g., Asthma, Diabetes, Hypertension"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Contact Name</label>
                <input
                  type="text"
                  required
                  value={medicalProfile.emergencyContactName}
                  onChange={(e) => setMedicalProfile({ ...medicalProfile, emergencyContactName: e.target.value })}
                  placeholder="Contact Name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={medicalProfile.emergencyContactPhone}
                  onChange={(e) => setMedicalProfile({ ...medicalProfile, emergencyContactPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl shadow transition text-sm mt-4"
            >
              Complete Profile & Open Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🚨</span>
          <h1 className="text-lg font-bold tracking-tight text-white">Rapid ResQ - Emergency Dashboard</h1>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
            ● Profile Active: {userData.fullName || 'User'} ({medicalProfile.bloodGroup})
          </span>
          <button
            onClick={() => setCurrentView('welcome')}
            className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-base font-semibold mb-2">📸 Incident Image & Injury Triage Upload</h2>
            <p className="text-sm text-slate-400 mb-4">Upload site photos or injury snapshots for instant AI-powered severity triage.</p>
            
            <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-red-500 transition cursor-pointer relative bg-slate-900/50">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              {imagePreview ? (
                <div className="space-y-3">
                  <img src={imagePreview} alt="Upload preview" className="max-h-48 mx-auto rounded-lg shadow object-contain" />
                  <p className="text-xs text-emerald-400 font-medium">Image uploaded successfully! Click or drag to replace.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-3xl">📂</span>
                  <p className="text-sm font-medium text-slate-300">Click to upload or drag & drop emergency photo</p>
                  <p className="text-xs text-slate-500">PNG, JPG, or WEBP up to 10MB</p>
                </div>
              )}
            </div>

            {selectedImage && (
              <button
                onClick={runTriageAI}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow transition text-sm flex items-center justify-center space-x-2"
              >
                <span>⚡</span>
                <span>Run AI Triage & Severity Analysis</span>
              </button>
            )}
          </div>

          {triageResult && (
            <div className="bg-slate-800 border border-red-500/30 rounded-2xl p-6 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-red-400 flex items-center space-x-2">
                  <span>⚠️ AI Triage Assessment Result</span>
                </h3>
                <span className="text-xs font-mono bg-red-500/10 text-red-300 px-2.5 py-1 rounded-full border border-red-500/20">
                  Confidence: {triageResult.confidence}
                </span>
              </div>
              <p className="text-sm font-semibold text-white">Severity: {triageResult.severity}</p>
              <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-700">{triageResult.recommendation}</p>
            </div>
          )}
        </div>

        <div className="space-y-6 flex flex-col">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-slate-200">📋 Medical History & Emergency Card</h3>
            <div className="bg-slate-900/60 border border-slate-700 p-4 rounded-xl space-y-2 text-xs text-slate-300">
              <p><strong className="text-white">Name:</strong> {userData.fullName || 'Not Provided'}</p>
              <p><strong className="text-white">Age / Blood Group:</strong> {medicalProfile.age ? `${medicalProfile.age} yrs` : 'N/A'} ({medicalProfile.bloodGroup})</p>
              <p><strong className="text-white">Allergies:</strong> {medicalProfile.allergies || 'None recorded'}</p>
              <p><strong className="text-white">Conditions:</strong> {medicalProfile.conditions || 'None recorded'}</p>
              <p><strong className="text-white">Emergency Contact:</strong> {medicalProfile.emergencyContactName || 'N/A'} ({medicalProfile.emergencyContactPhone || 'N/A'})</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
