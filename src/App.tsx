import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ResearchPage from "./pages/ResearchPage";
import ArtPage from "./pages/ArtPage";
import ArtHubPage from "./pages/ArtHubPage";
import DrawingHubPage from "./pages/DrawingHubPage";
import DrawingArchivePage from "./pages/DrawingArchivePage";
import ArtArchivePlaceholder from "./pages/ArtArchivePlaceholder";
import { drawingCategories } from "./config/scenes/drawingScene";
import WritingPage from "./pages/WritingPage";
import LinksPage from "./pages/LinksPage";

export default function App() {
  return (
    <div className="theme-survival site-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/art" element={<ArtHubPage />} />
        <Route path="/art/animation" element={<ArtPage />} />
        <Route path="/art/painting" element={<ArtArchivePlaceholder title="Painting" />} />
        <Route path="/art/drawing" element={<DrawingHubPage />} />
        {drawingCategories.map((category) => (
          <Route
            key={category.id}
            path={category.route}
            element={<DrawingArchivePage title={category.label} folder={category.folder} />}
          />
        ))}
        <Route path="/art/drawing/sketch" element={<Navigate to="/art/drawing/people" replace />} />
        <Route path="/art/drawing/ideas" element={<Navigate to="/art/drawing/places-scenes" replace />} />
        <Route path="/art/storyboards" element={<ArtArchivePlaceholder title="Storyboards" label="Storyboards / Animatics" />} />
        <Route path="/animation" element={<Navigate to="/art/animation" replace />} />
        <Route path="/art/archive" element={<Navigate to="/art/animation" replace />} />
        <Route path="/writing" element={<WritingPage />} />
        <Route path="/links" element={<LinksPage />} />
      </Routes>
    </div>
  );
}
