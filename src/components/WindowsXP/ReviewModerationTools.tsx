import React from "react";
import { AlertTriangle, Shield, Trash2, Eye } from "lucide-react";
import { ClientReview } from "../../contexts/SaveDataContext";

interface ReviewModerationToolsProps {
  reviews: ClientReview[];
  onUpdateReviews: (reviews: ClientReview[]) => void;
}

const ReviewModerationTools: React.FC<ReviewModerationToolsProps> = ({
  reviews,
  onUpdateReviews,
}) => {
  // Détecter les avis suspects
  const detectSuspiciousReviews = () => {
    const suspicious: string[] = [];

    reviews.forEach((review) => {
      const suspiciousIndicators = [];

      // 1. Emails suspects
      if (
        review.email.includes("@example.com") ||
        review.email.includes("@test.")
      ) {
        suspiciousIndicators.push("Email de test");
      }

      // 2. Noms suspects
      if (
        review.clientName.toLowerCase().includes("test") ||
        review.clientName.toLowerCase().includes("fake") ||
        review.clientName.toLowerCase().includes("bot") ||
        /^user\d+$/i.test(review.clientName)
      ) {
        suspiciousIndicators.push("Nom suspect");
      }

      // 3. Commentaires génériques
      const genericPhrases = [
        "very good",
        "excellent work",
        "great job",
        "perfect",
        "amazing",
        "love it",
        "recommended",
      ];
      const isGeneric = genericPhrases.some((phrase) =>
        review.comment.toLowerCase().includes(phrase),
      );
      if (isGeneric && review.comment.length < 30) {
        suspiciousIndicators.push("Commentaire générique");
      }

      // 4. Caractères répétitifs
      if (/(.)\1{3,}/.test(review.comment)) {
        suspiciousIndicators.push("Caractères répétitifs");
      }

      // 5. Tous les avis 5 étoiles du même jour
      const sameDayReviews = reviews.filter((r) => r.date === review.date);
      if (
        sameDayReviews.length > 1 &&
        sameDayReviews.every((r) => r.rating === 5)
      ) {
        suspiciousIndicators.push("Possible manipulation de notes");
      }

      if (suspiciousIndicators.length > 0) {
        suspicious.push(
          `${review.clientName} (${review.email}): ${suspiciousIndicators.join(", ")}`,
        );
      }
    });

    return suspicious;
  };

  // Supprimer automatiquement les avis manifestement faux
  const removeObviousFakes = () => {
    const fakePatterns = [
      /fake/i,
      /test123/i,
      /spam/i,
      /bot/i,
      /@example\.com$/,
      /@test\./,
      /^user\d+$/i,
    ];

    const cleanReviews = reviews.filter((review) => {
      const isFake = fakePatterns.some(
        (pattern) =>
          pattern.test(review.clientName) ||
          pattern.test(review.email) ||
          pattern.test(review.comment),
      );
      return !isFake;
    });

    const removedCount = reviews.length - cleanReviews.length;
    onUpdateReviews(cleanReviews);

    alert(
      `Nettoyage terminé !\n${removedCount} avis suspects supprimés automatiquement.`,
    );
  };

  // Marquer les avis suspects comme rejetés
  const flagSuspiciousReviews = () => {
    const suspiciousIds: string[] = [];

    const updatedReviews = reviews.map((review) => {
      const isSuspicious =
        review.email.includes("@example.com") ||
        review.clientName.toLowerCase().includes("test") ||
        review.comment.length < 20 ||
        /(.)\1{3,}/.test(review.comment);

      if (isSuspicious && review.status === "pending") {
        suspiciousIds.push(review.id);
        return {
          ...review,
          status: "rejected" as const,
          adminNote: "Marqué automatiquement comme suspect",
        };
      }
      return review;
    });

    onUpdateReviews(updatedReviews);
    alert(
      `${suspiciousIds.length} avis suspects ont été marqués comme rejetés.`,
    );
  };

  const suspiciousReviews = detectSuspiciousReviews();

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="text-yellow-600" size={20} />
        <h4 className="font-semibold text-yellow-800">
          Outils de Modération Anti-Spam
        </h4>
      </div>

      {suspiciousReviews.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-red-600" size={16} />
            <span className="font-medium text-red-800">
              ⚠️ {suspiciousReviews.length} avis suspects détectés:
            </span>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {suspiciousReviews.slice(0, 3).map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
            {suspiciousReviews.length > 3 && (
              <li>• ... et {suspiciousReviews.length - 3} autres</li>
            )}
          </ul>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={removeObviousFakes}
          className="xp-button px-3 py-2 bg-red-100 hover:bg-red-200 text-red-800 flex items-center gap-2 text-sm"
        >
          <Trash2 size={16} />
          Supprimer Faux Avis
        </button>

        <button
          onClick={flagSuspiciousReviews}
          className="xp-button px-3 py-2 bg-orange-100 hover:bg-orange-200 text-orange-800 flex items-center gap-2 text-sm"
        >
          <AlertTriangle size={16} />
          Marquer Suspects
        </button>

        <button
          onClick={() => {
            const report = detectSuspiciousReviews();
            if (report.length === 0) {
              alert("✅ Aucun avis suspect détecté !");
            } else {
              alert(`🔍 Rapport de sécurité:\n\n${report.join("\n\n")}`);
            }
          }}
          className="xp-button px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center gap-2 text-sm"
        >
          <Eye size={16} />
          Analyser Tout
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-600">
        💡 <strong>Protection active:</strong> Validation automatique des
        emails, détection de spam, limitation des doublons, filtrage des mots
        interdits.
      </div>
    </div>
  );
};

export default ReviewModerationTools;
