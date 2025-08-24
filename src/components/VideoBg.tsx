"use client";

import React, { useEffect, useRef } from 'react';

type VideoBgProps = {
	videoId?: string; // YouTube video id
	minJumpSec?: number; // minimum seconds between jumps
	maxJumpSec?: number; // maximum seconds between jumps
};

type YTPlayer = {
	getDuration?: () => number;
	seekTo?: (seconds: number, allowSeekAhead?: boolean) => void;
	destroy?: () => void;
	mute?: () => void;
	setVolume?: (n: number) => void;
	playVideo?: () => void;
};

declare global {
	interface Window {
		YT?: { Player: new (el: Element, opts: Record<string, unknown>) => YTPlayer };
	}
}

const loadYouTubeApi = () => {
	return new Promise<void>((resolve) => {
		// If already available, resolve
		if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
			resolve();
			return;
		}

		const existing = document.getElementById('youtube-iframe-api');
		if (existing) {
			// wait for global to be ready
			const check = setInterval(() => {
				if (window.YT && window.YT.Player) {
					clearInterval(check);
					resolve();
				}
			}, 200);
			return;
		}

		const tag = document.createElement('script');
		tag.id = 'youtube-iframe-api';
		tag.src = 'https://www.youtube.com/iframe_api';
		tag.async = true;
		tag.onload = () => {
			// onYouTubeIframeAPIReady will fire and create window.YT
			const check = setInterval(() => {
				if (window.YT && window.YT.Player) {
					clearInterval(check);
					resolve();
				}
			}, 200);
		};
		document.body.appendChild(tag);
	});
};

const VideoBg: React.FC<VideoBgProps> = ({ videoId = 'pNVlLM8Ysaw', minJumpSec = 60, maxJumpSec = 120 }) => {
	 const containerRef = useRef<HTMLDivElement | null>(null);
	 const playerRef = useRef<YTPlayer | null>(null);
	 const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		let mounted = true;

			loadYouTubeApi().then(() => {
				if (!mounted || !containerRef.current) return;

				const YT = window.YT!;
				playerRef.current = new YT.Player(containerRef.current as Element, {
				videoId,
				playerVars: {
					autoplay: 1,
					controls: 0,
					modestbranding: 1,
					rel: 0,
					showinfo: 0,
					mute: 1,
					playsinline: 1,
				},
						events: {
							onReady: (e: { target: YTPlayer }) => {
								try {
									e.target.mute?.();
									e.target.setVolume?.(0);
									e.target.playVideo?.();
								} catch {
									// ignore autoplay errors
								}
								scheduleJump();
							},
						},
				  });
		});

				const scheduleJump = () => {
			const delay = Math.floor(Math.random() * (maxJumpSec - minJumpSec + 1) + minJumpSec) * 1000;
			if (typeof window !== 'undefined') {
				// clear previous
						if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
						timeoutRef.current = window.setTimeout(() => {
					try {
						const player = playerRef.current;
						if (player && typeof player.getDuration === 'function') {
							const dur = player.getDuration();
												 if (dur > 5) {
													 const t = Math.floor(Math.random() * Math.max(1, Math.floor(dur - 2)));
													 player.seekTo?.(t, true);
												 }
						}
							} catch {
								// ignore
					}
					scheduleJump();
				}, delay);
			}
		};

		return () => {
			mounted = false;
					if (timeoutRef.current !== null) {
						window.clearTimeout(timeoutRef.current);
					}
			if (playerRef.current && playerRef.current.destroy) {
				playerRef.current.destroy();
			}
		};
	}, [videoId, minJumpSec, maxJumpSec]);

	return (
		<div className="hero__video" aria-hidden>
			<div ref={containerRef} style={{ width: '100%', height: '100%' }} />
			<div className="hero__video__overlay" />
			<style jsx>{`
				.hero__video { position: absolute; inset: 0; z-index: 1; overflow: hidden; }
				.hero__video > div { position: absolute; top: 50%; left: 50%; width: 177.77vh; height: 100vh; transform: translate(-50%, -50%); }
				.hero__video iframe { width: 100% !important; height: 100% !important; }
				.hero__video__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(16,16,16,0.15), rgba(16,16,16,0.45)); z-index: 2; pointer-events: none; }
				@media (max-width: 768px) { .hero__video { display: none; } }
			`}</style>
		</div>
	);
};

export default VideoBg;
