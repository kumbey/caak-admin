export default function Rating() {
    const rateStars = (event) => {
        const starsContainer = event.target.closest(".rating-stars");
        const stars = Array.from(starsContainer.children);
        const totalStars = stars.length;
        const index = stars.indexOf(event.target);
        let count = 0;
        count = totalStars - index;
        stars.forEach((star) => star.classList.remove("active"));
    
        event.target.classList.add("active");
    
        console.log("You have rated " + count + " stars.");
      };
    return (
        <form onClick={rateStars} className="rating-stars mt-5">
            <span className="la la-star"></span>
            <span className="la la-star"></span>
            <span className="la la-star"></span>
            <span className="la la-star"></span>
            <span className="la la-star"></span>
        </form>
    )
}
