import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Send,
  MessageCircle,
  User,
  Calendar,
  CheckCircle,
  Camera,
  Settings,
} from "lucide-react";
import { useSaveData, ClientReview } from "../../contexts/SaveDataContext";

interface ReviewsWindowProps {
  onClose: () => void;
}

const ReviewsWindow: React.FC<ReviewsWindowProps> = ({ onClose }) => {
  const { data, saveData } = useSaveData();
  const [activeTab, setActiveTab] = useState<"reviews" | "add" | "profile">(
    "reviews",
  );
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [newReview, setNewReview] = useState({
    clientName: "",
    email: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState("");
  const [newDisplayName, setNewDisplayName] = useState(
    data.settings.displayName,
  );

  // Filtrer les avis approuvés pour l'affichage public
  const approvedReviews = data.reviews.filter(
    (review) => review.status === "approved",
  );
  const averageRating =
    approvedReviews.length > 0
      ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) /
        approvedReviews.length
      : 0;

  const handleSubmitReview = async () => {
    // Validation des champs requis
    if (
      !newReview.clientName ||
      !newReview.email ||
      !newReview.comment ||
      rating === 0
    ) {
      alert("Veuillez remplir tous les champs et donner une note !");
      return;
    }

    // Validation anti-spam
    const validationErrors = [];

    if (newReview.clientName.length < 2 || newReview.clientName.length > 50) {
      validationErrors.push("Le nom doit contenir entre 2 et 50 caractères");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newReview.email)) {
      validationErrors.push("Format d'email invalide");
    }

    if (newReview.comment.length < 10 || newReview.comment.length > 1000) {
      validationErrors.push(
        "Le commentaire doit contenir entre 10 et 1000 caractères",
      );
    }

    const forbiddenWords = [
      "fake",
      "spam",
      "bot",
      "test123",
      "aaaaaa",
      "lorem ipsum",
    ];
    const hasSpamWords = forbiddenWords.some(
      (word) =>
        newReview.comment.toLowerCase().includes(word.toLowerCase()) ||
        newReview.clientName.toLowerCase().includes(word.toLowerCase()),
    );

    if (hasSpamWords) {
      validationErrors.push("Contenu détecté comme spam");
    }

    const existingEmailReview = data.reviews.find(
      (r) => r.email === newReview.email,
    );
    if (existingEmailReview) {
      validationErrors.push("Un avis existe déjà pour cette adresse email");
    }

    if (/(.)\1{4,}/.test(newReview.comment)) {
      validationErrors.push(
        "Commentaire invalide (caractères répétitifs détectés)",
      );
    }

    if (validationErrors.length > 0) {
      alert("Erreurs de validation :\n" + validationErrors.join("\n"));
      return;
    }

    setIsSubmitting(true);

    const review: ClientReview = {
      id: Date.now().toString(),
      clientName: newReview.clientName.trim(),
      email: newReview.email.trim().toLowerCase(),
      rating: rating,
      comment: newReview.comment.trim(),
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      adminNote: "En attente de validation manuelle",
    };

    const updatedReviews = [...data.reviews, review];
    saveData({ reviews: updatedReviews });

    setNewReview({ clientName: "", email: "", comment: "" });
    setRating(5);
    setIsSubmitting(false);
    setShowSuccess(true);

    console.log(
      "📝 Nouvel avis soumis (validation requise):",
      review.clientName,
    );

    setTimeout(() => {
      setShowSuccess(false);
      setActiveTab("reviews");
    }, 3000);
  };

  const handleUpdateProfile = () => {
    const updatedSettings = {
      ...data.settings,
      profilePicture: newProfilePic || data.settings.profilePicture,
      displayName: newDisplayName || data.settings.displayName,
    };

    saveData({ settings: updatedSettings });
    alert("Profil mis à jour avec succès !");
    console.log("👤 Profil mis à jour:", updatedSettings.displayName);
  };

  const renderStars = (rating: number, size: "small" | "large" = "small") => {
    const starSize = size === "large" ? 24 : 16;
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={starSize}
            className={`${
              star <= rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderInteractiveStars = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={32}
            className={`cursor-pointer transition-colors ${
              star <= (hoveredRating || rating)
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 hover:text-yellow-400"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200">
              <img
                src={data.settings.profilePicture}
                alt={data.settings.displayName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
                }}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Avis Clients - {data.settings.displayName}
              </h2>
              <p className="text-sm text-gray-600">
                Monteur Vidéo Professionnel
              </p>
            </div>
          </div>
          {approvedReviews.length > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm font-medium text-blue-800">
                {averageRating.toFixed(1)} ({approvedReviews.length} avis)
              </span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "reviews"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Avis Clients ({approvedReviews.length})
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "add"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Laisser un Avis
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Settings size={16} className="inline mr-1" />
            Mon Profil
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "reviews" && (
          <div className="space-y-4">
            {approvedReviews.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle
                  size={64}
                  className="text-gray-300 mx-auto mb-4"
                />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  Aucun avis pour le moment
                </h3>
                <p className="text-gray-400">
                  Soyez le premier à laisser un avis !
                </p>
              </div>
            ) : (
              approvedReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {review.clientName}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          {formatDate(review.date)}
                        </div>
                      </div>
                    </div>
                    {renderStars(review.rating, "large")}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === "add" && (
          <div className="max-w-2xl mx-auto">
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle
                  size={64}
                  className="text-green-500 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Merci pour votre avis !
                </h3>
                <p className="text-gray-600">
                  Votre commentaire a été envoyé et est en attente de
                  vérification.
                  <br />
                  Il apparaîtra bientôt dans les avis clients.
                </p>
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  Partagez votre expérience
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre nom / Pseudonyme *
                    </label>
                    <input
                      type="text"
                      value={newReview.clientName}
                      onChange={(e) =>
                        setNewReview({
                          ...newReview,
                          clientName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: GameMaster_YT"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newReview.email}
                      onChange={(e) =>
                        setNewReview({ ...newReview, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="votre.email@exemple.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Votre email ne sera pas affiché publiquement
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre note *
                    </label>
                    <div className="flex items-center gap-2">
                      {renderInteractiveStars()}
                      <span className="text-sm text-gray-600">
                        ({rating}/5 étoiles)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre commentaire *
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Partagez votre expérience avec Lino LVT : qualité du montage, délais, communication, résultats obtenus..."
                    />
                  </div>

                  <button
                    onClick={handleSubmitReview}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Envoyer mon avis
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Personnaliser mon Profil
              </h3>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-200 mb-4">
                    <img
                      src={newProfilePic || data.settings.profilePicture}
                      alt="Photo de profil"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Photo de profil actuelle
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom d'affichage
                  </label>
                  <input
                    type="text"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Lino LVT"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de la photo de profil
                  </label>
                  <input
                    type="url"
                    value={newProfilePic}
                    onChange={(e) => setNewProfilePic(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://exemple.com/ma-photo.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Utilisez une URL d'image (JPG, PNG). Recommandé : 150x150px
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Ou choisissez une photo prédéfinie :
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
                      "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
                      "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
                      "https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
                      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
                      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
                      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
                      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
                    ].map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setNewProfilePic(url)}
                        className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                          (newProfilePic || data.settings.profilePicture) ===
                          url
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        <img
                          src={url}
                          alt={`Avatar ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 font-medium"
                  >
                    <Camera size={20} />
                    Mettre à jour le profil
                  </button>
                  <button
                    onClick={() => {
                      setNewProfilePic("");
                      setNewDisplayName(data.settings.displayName);
                    }}
                    className="px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsWindow;
