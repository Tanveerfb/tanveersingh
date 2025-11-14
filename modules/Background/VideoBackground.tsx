export default function VideoBackground() {
  return (
    <>
      <div className="video-bg-container">
        <video
          src="/videos/home-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="video-bg"
        />
      </div>
      <div className="video-overlay" />
    </>
  );
}
