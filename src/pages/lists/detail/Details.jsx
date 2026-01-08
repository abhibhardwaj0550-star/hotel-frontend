import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Header";
import Footer from "../../../components/Footer";
import Axios from "../../../components/Axios";

const DetailsPage = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDescModal, setShowDescModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const shareUrl = window.location.href;

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await Axios.get(`/hotel/${id}`);
        if (res.data.success) {
          setHotel(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: hotel.package,
        text: "Check out this place",
        url: shareUrl,
      });
    } else {
      alert("Sharing not supported on this device");
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading...</div>;
  if (!hotel) return <div className="pt-24 text-center">Hotel not found</div>;

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 w-full z-50 bg-white border-b">
        <Navbar />
      </div>

      <main className="pt-24 max-w-7xl mx-auto px-4">
        {/* TITLE + SHARE */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              {hotel.package}
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              ⭐ {hotel.rating || 5} · Guest favourite ·{" "}
              {hotel.location || "Gurugram, India"}
            </p>
          </div>

          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100"
          >
            🔗 Share
          </button>
        </div>

        {/* IMAGE PREVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden relative">
          <img
            src={hotel.previewImage}
            alt=""
            className="md:col-span-2 md:row-span-2 h-72 w-full object-cover"
          />

          {hotel.images?.slice(0, 4).map((img, i) => (
            <img key={i} src={img} alt="" className="h-36 w-full object-cover" />
          ))}

          <button
            onClick={() => setShowGallery(true)}
            className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow text-sm font-semibold"
          >
            Show all photos
          </button>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold">
                Entire serviced apartment
              </h2>
              <p className="text-gray-600">
                3 guests · 1 bedroom · 1 bed · 1 bathroom
              </p>
            </div>

            <hr />

            <div>
              <h3 className="font-semibold mb-2">About this place</h3>
              <p className="text-gray-700 line-clamp-2">
                {hotel.description}
              </p>
              <button
                onClick={() => setShowDescModal(true)}
                className="mt-2 font-semibold underline"
              >
                Read more
              </button>
            </div>

            <hr />

            <div>
              <h3 className="font-semibold mb-2">What this place offers</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 border rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <hr />

            <div>
              <h3 className="text-xl font-semibold mb-2">Where you’ll be</h3>
              <p className="text-gray-600 mb-4">
                {hotel.location || "Gurugram, India"}
              </p>

              <div className="w-full h-96 rounded-xl overflow-hidden border">
                <iframe
                  title="Google Map"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=15&output=embed`}
                />
              </div>
            </div>
          </div>

          {/* BOOKING CARD */}
          <div className="sticky top-28 h-fit border rounded-xl p-6 shadow-md">
            <div className="flex justify-between mb-4">
              <p className="text-xl font-semibold">
                ₹{hotel.rate}
                <span className="text-sm text-gray-500"> / night</span>
              </p>
              ⭐ {hotel.rating || 5}
            </div>

            <div className="border rounded-lg overflow-hidden mb-4">
              <div className="grid grid-cols-2">
                <div className="p-3 border-r">
                  <label className="text-xs font-semibold">CHECK-IN</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full mt-1 outline-none"
                  />
                </div>

                <div className="p-3">
                  <label className="text-xs font-semibold">CHECK-OUT</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full mt-1 outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={!checkIn || !checkOut}
              className="w-full bg-rose-500 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold"
            >
              Check availability
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* SHARE MODAL */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Share this place</h2>

            <div className="space-y-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-100"
              >
                📱 WhatsApp
              </a>

              <a
                href={`mailto:?subject=${hotel.package}&body=${shareUrl}`}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-100"
              >
                ✉️ Email
              </a>

              <button
                onClick={handleCopy}
                className="flex items-center gap-3 p-3 border rounded-lg w-full hover:bg-gray-100"
              >
                🔗 {copied ? "Link copied!" : "Copy link"}
              </button>

              <button
                onClick={() => setShowEmbedModal(true)}
                className="flex items-center gap-3 p-3 border rounded-lg w-full hover:bg-gray-100"
              >
                {"< >"} Embed
              </button>

              <button
                onClick={handleNativeShare}
                className="flex items-center gap-3 p-3 border rounded-lg w-full hover:bg-gray-100"
              >
                ➕ More options
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL SCREEN GALLERY */}
    {showEmbedModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
            <button
              onClick={() => setShowEmbedModal(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Embed this place</h2>

            <textarea
              readOnly
              className="w-full h-32 border rounded-lg p-3 text-sm"
              value={`<iframe src="${shareUrl}" width="100%" height="400"></iframe>`}
            />
          </div>
        </div>
      )}

      {/* FULL GALLERY (SMALLER THUMBNAILS) */}
      {showGallery && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between">
            <button
              onClick={() => setShowGallery(false)}
              className="font-semibold"
            >
              ✕ Close
            </button>
            <p className="text-sm">{hotel.package}</p>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[hotel.previewImage, ...(hotel.images || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
            
            </div>
          </div>
      )}

      {/* EMBED MODAL */}
      {showEmbedModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
            <button
              onClick={() => setShowEmbedModal(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Embed this place</h2>

            <textarea
              readOnly
              className="w-full h-32 border rounded-lg p-3 text-sm"
              value={`<iframe src="${shareUrl}" width="100%" height="400"></iframe>`}
            />
          </div>
        </div>
      )}

      {/* DESCRIPTION MODAL (UI ONLY) */}
      {showDescModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setShowDescModal(false)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDescModal(false)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              About this place
            </h2>

            <p className="text-gray-700 whitespace-pre-line">
              {hotel.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsPage;
