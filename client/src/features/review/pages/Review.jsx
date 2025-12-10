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
        if (!user) {
            navigate("/login?redirect=/review");
            return;
        }
        const checkUserHasReviewed = async () => {
            const hasReviewed = await getUserHasReviewed(user.userId);
            if (hasReviewed.data.reviewed || !hasReviewed.success) {
                navigate("/");
            }
        };
        checkUserHasReviewed();
    }, []);

    return (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]"> 
            {isSuccess ? <ThankYouForReview /> : <ReviewForm setIsSuccess={setIsSuccess} />}
        </div>
    );
};

export default Review;