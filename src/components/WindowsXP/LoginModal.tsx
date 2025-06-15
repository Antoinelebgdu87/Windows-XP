import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, AlertTriangle } from "lucide-react";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    // Simuler une vérification async
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Vérifier les identifiants corrects
    if (username === "admin12" && password === "Acces2025") {
      setIsLoading(false);
      onLoginSuccess();
      return;
    }

    // Vérifier les faux identifiants (rickroll)
    if (username === "Admin12" && password === "Baka32") {
      setIsLoading(false);
      // Rickroll !
      window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0", "_blank");
      setError("🎵 Never gonna give you up! 🎵");
      return;
    }

    // Identifiants incorrects
    setIsLoading(false);
    setError("Nom d'utilisateur ou mot de passe incorrect");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[250]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="xp-window w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {/* Window Header */}
        <div className="xp-window-header">
          <span>Connexion Administrateur</span>
        </div>

        {/* Window Content */}
        <div className="xp-window-content space-y-6 p-6">
          {/* Logo */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">
              Accès Administrateur
            </h2>
            <p className="text-sm text-gray-600">
              Panneau de gestion du portfolio
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center space-x-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertTriangle size={16} />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="xp-inset w-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Saisissez votre nom d'utilisateur"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="xp-inset w-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Saisissez votre mot de passe"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="xp-button px-6 py-2"
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              onClick={handleLogin}
              className="xp-button px-6 py-2 bg-blue-100 font-bold"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Vérification des identifiants...</span>
              </div>
            </div>
          )}

          {/* Hint */}
          <div className="text-center text-xs text-gray-500 bg-gray-100 p-3 rounded">
            💡 <strong>Astuce:</strong> Les identifiants peuvent être trouvés
            dans les fichiers du système...
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
