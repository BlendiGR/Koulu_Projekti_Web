import ReviewForm from "../components/ReviewForm";
import { useEffect, useState } from "react";
import { useUser } from "/src/hooks/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/features/auth/hooks/useAuth";
import ThankYouForReview from "../components/ThankYouForReview";

const Review = () => {
    const { getUserHasReviewed } = useUser();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const checkUserHasReviewed = async () => {
            if (!user) return; 
            
            const hasReviewed = await getUserHasReviewed(user.userId);
            if (hasReviewed.data.reviewed || !hasReviewed.success) {
                navigate("/");
            }
        };
        checkUserHasReviewed();
    }, [user]);

    return (
        <div className="flex justify-center items-center min-h-screen"> 
            {isSuccess ? <ThankYouForReview /> : <ReviewForm setIsSuccess={setIsSuccess} />}
        </div>
    );
};

export default Review;