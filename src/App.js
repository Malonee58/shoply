import React, { useState, useEffect } from "react";
import { PRODUCTS, CATEGORIES, CURRENCY } from "./data";
import "./styles.css";

function Header({ onSearch, openCart }) {
	const [q, setQ] = useState("");
	function submit(e) {
		e.preventDefault();
		onSearch(q);
	}
	return (
		<header className="header">
			<div
				className="container"
				style={{ display: "flex", alignItems: "center", gap: 12 }}
			>
				<div className="logo">
					<div
						style={{
							width: 40,
							height: 40,
							borderRadius: 10,
							background: "#0f172a",
							color: "white",
							display: "grid",
							placeItems: "center",
						}}
					>
						S
					</div>
					<div>Shoply</div>
				</div>
				<form onSubmit={submit} style={{ flex: 1 }}>
					<input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder="Search products, brands, categories"
						style={{
							width: "100%",
							padding: 10,
							borderRadius: 999,
							border: "1px solid #e6eef8",
						}}
					/>
				</form>
				<button className="btn" onClick={openCart}>
					Cart{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-cart ml-2"
						viewBox="0 0 16 16"
					>
						<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
					</svg>
				</button>
			</div>
		</header>
	);
}

function Hero() {
	return (
		<section
			style={{
				background: "linear-gradient(99deg,black,#7c3acb)",
				color: "white",
				padding: "56px 0",
			}}
		>
			<div
				className="container"
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					alignItems: "center",
					gap: 20,
				}}
			>
				<div>
					<div
						style={{
							background: "rgba(255,255,255,0.12)",
							display: "inline-block",
							padding: "6px 10px",
							borderRadius: 999,
						}}
					>
						New • Up to 50% off
					</div>
					<h1 style={{ fontSize: 40, marginTop: 12, marginBottom: 8 }}>
						Welcome to Shoply — Your One-Stop Online Store
					</h1>
					<p style={{ color: "#e6e6e6" }}>
						Discover curated picks across clothings, gadgets, sports & home.
						Delivery usually takes 3–5 business days.
					</p>
					<div style={{ marginTop: 16 }}>
						<button className="btn">Shop Now</button>
					</div>
				</div>
				<div style={{ borderRadius: 16, overflow: "hidden" }}>
					<img
						src={PRODUCTS.find((p) => p.category === "home").img}
						alt="hero"
						style={{ width: "100%", height: 260, objectFit: "cover" }}
					/>
				</div>
			</div>
		</section>
	);
}

function CategoryGrid({ onSelect }) {
	const rep = {
		clothing: "clothing",
		electronics: "electronics",
		gadgets: "gadgets",
		sports: "sports",
		home: "home",
	};
	const repImg = {
		clothing: PRODUCTS.find((p) => p.category === "clothing").img,
		electronics: PRODUCTS.find((p) => p.category === "electronics").img,
		gadgets: PRODUCTS.find((p) => p.category === "gadgets").img,
		sports: PRODUCTS.find((p) => p.category === "sports").img,
		home: PRODUCTS.find((p) => p.category === "home").img,
	};
	return (
		<section className="container" style={{ padding: "32px 0" }}>
			<h2>Shop by Category</h2>
			<div className="grid">
				{Object.keys(repImg).map((k) => (
					<div
						key={k}
						className="card"
						onClick={() => onSelect(k)}
						style={{ cursor: "pointer" }}
					>
						<div style={{ fontWeight: 700, marginBottom: 8 }}>
							{k.charAt(0).toUpperCase() + k.slice(1)}
						</div>
						<img className="category-img" src={repImg[k]} alt={k} />
					</div>
				))}
			</div>
		</section>
	);
}

function ProductCard({ p, onAdd }) {
	return (
		<div className="card">
			<img className="product-img" src={p.img} alt={p.title} />
			<div style={{ marginTop: 8 }}>
				<div style={{ fontWeight: 700 }}>{p.title}</div>
				<div style={{ color: "#64748b", fontSize: 13 }}>{p.category}</div>
				<div style={{ marginTop: 8, fontWeight: 700 }}>
					{CURRENCY}
					{p.price.toLocaleString()}
				</div>
				<div style={{ marginTop: 10 }}>
					<button className="btn" onClick={() => onAdd(p)}>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}

function ProductsGrid({ items, onAdd }) {
	return (
		<div className="grid">
			{items.map((it) => (
				<ProductCard key={it.id} p={it} onAdd={onAdd} />
			))}
		</div>
	);
}

function CartModal({ open, onClose, cart, updateQty, removeItem }) {
	if (!open) return null;
	const items = Object.values(cart);
	const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
	// delivery fee per item rule: if item price < 5000 => 1500 fee applied per such item
	const delivery = items.reduce(
		(d, it) => d + (it.price < 5000 ? 1500 * it.qty : 0),
		0
	);
	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				background: "rgba(2,6,23,0.4)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 60,
			}}
		>
			<div
				style={{
					width: "90%",
					maxWidth: 900,
					background: "white",
					borderRadius: 12,
					padding: 20,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<h3>Your Cart</h3>
					<button
						onClick={onClose}
						className="btn"
						style={{ background: "#e2e8f0", color: "#0f172a" }}
					>
						Close
					</button>
				</div>
				<div style={{ marginTop: 12 }}>
					{items.length === 0 ? (
						<div style={{ padding: 40, textAlign: "center", color: "#64748b" }}>
							Your cart is empty.
						</div>
					) : (
						items.map((it) => (
							<div
								key={it.id}
								style={{
									display: "flex",
									gap: 12,
									alignItems: "center",
									padding: 12,
									background: "#f8fafc",
									borderRadius: 8,
									marginBottom: 8,
								}}
							>
								<img
									src={it.img}
									style={{
										width: 80,
										height: 80,
										objectFit: "cover",
										borderRadius: 8,
									}}
									alt={it.title}
								/>
								<div style={{ flex: 1 }}>
									<div style={{ fontWeight: 700 }}>{it.title}</div>
									<div style={{ color: "#64748b" }}>Qty: {it.qty}</div>
								</div>
								<div style={{ fontWeight: 700 }}>
									{CURRENCY}
									{(it.price * it.qty).toLocaleString()}
								</div>
								<div
									style={{ display: "flex", flexDirection: "column", gap: 6 }}
								>
									<button onClick={() => updateQty(it.id, it.qty + 1)}>
										+
									</button>
									<button onClick={() => updateQty(it.id, it.qty - 1)}>
										-
									</button>
									<button
										onClick={() => removeItem(it.id)}
										style={{ color: "#ef4444" }}
									>
										Remove
									</button>
								</div>
							</div>
						))
					)}
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginTop: 16,
						alignItems: "center",
					}}
				>
					<div>
						<div style={{ fontSize: 14, color: "#64748b" }}>
							Delivery fees: ₦1500 for every item priced below ₦5000. Fees vary
							by location.
						</div>
						<div style={{ fontWeight: 700, marginTop: 8 }}>
							Delivery: {CURRENCY}
							{delivery.toLocaleString()}
						</div>
					</div>
					<div style={{ textAlign: "right" }}>
						<div style={{ fontWeight: 700 }}>
							Subtotal: {CURRENCY}
							{subtotal.toLocaleString()}
						</div>
						<div style={{ fontWeight: 900, fontSize: 18 }}>
							Total: {CURRENCY}
							{(subtotal + delivery).toLocaleString()}
						</div>
						<div style={{ marginTop: 8 }}>
							<button
								className="btn"
								onClick={() =>
									alert(
										"Checkout not available yet. Please contact shoply@gmail.com to complete your purchase."
									)
								}
							>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function Chatbot() {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			from: "bot",
			text: "Hi 👋 I'm Miracle Malonee, your shopping assistant.",
		},
	]);
	const [input, setInput] = useState("");

	// Bot responses
	const getBotResponse = (userMessage) => {
		const msg = userMessage.toLowerCase();

		if (msg.includes("hi") || msg.includes("hello")) {
			return `Hi I'm Miracle Malonee, your shopping assistant. Please note that delivery usually
			takes 3-5 business days. You'll receive a tracking number after
			purchase. For complaints and enquiries please contact 
			shoply@gmail.com or WhatsApp +2348143098212. 
			Note: Delivery fees vary depending on location.`;
		} else if (msg.includes("delivery")) {
			return "Please note that delivery usually takes 3-5 business days, depending on your location 🚚.";
		} else if (msg.includes("price") || msg.includes("cost")) {
			return "Prices vary depending on the item. Can you specify the product?";
		} else if (msg.includes("thanks") || msg.includes("thank you")) {
			return "You're welcome 😊 Happy shopping with us!";
		} else {
			return "I'm not sure I understand 🤔. Please ask about delivery, pricing, or support.";
		}
	};

	// Send message
	const handleSend = () => {
		if (!input.trim()) return;

		// Add user message
		const newMessages = [...messages, { from: "user", text: input }];
		setMessages(newMessages);

		// Add bot response
		setTimeout(() => {
			const response = getBotResponse(input);
			setMessages((prev) => [...prev, { from: "bot", text: response }]);
		}, 600);

		setInput("");
	};

	return (
		<div className="chatbot">
			{open ? (
				<div
					className="chatbot-window"
					style={{
						width: 300,
						border: "1px solid #26077aff",
						borderRadius: 8,
						padding: 10,
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 10,
						}}
					>
						<strong>Malonee🤖</strong>
						<button onClick={() => setOpen(false)}>✕</button>
					</div>

					{/* Messages */}
					<div style={{ maxHeight: 250, overflowY: "auto", marginBottom: 10 }}>
						{messages.map((msg, idx) => (
							<div
								key={idx}
								style={{
									textAlign: msg.from === "user" ? "right" : "left",
									margin: "6px 0",
								}}
							>
								<span
									style={{
										background: msg.from === "user" ? "#0813a3ff" : "#222",
										color: msg.from === "user" ? "#fff" : "#fff",
										padding: "6px 10px",
										borderRadius: 12,
										display: "inline-block",
									}}
								>
									{msg.text}
								</span>
							</div>
						))}
					</div>

					{/* Input */}
					<div style={{ display: "flex", gap: 6 }}>
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleSend()}
							style={{
								flex: 1,
								padding: 6,
								borderRadius: 8,
								border: "2px solid #160952ff",
							}}
							placeholder="Type a message..."
						/>
						<button
							onClick={handleSend}
							style={{
								padding: "6px 12px",
								borderRadius: 8,
								color: "#fff",
								backgroundColor: "#160952ff",
							}}
						>
							Send
						</button>
					</div>
				</div>
			) : (
				<button className="btn" onClick={() => setOpen(true)}>
					💬
				</button>
			)}
		</div>
	);
}

export default function App() {
	const [view, setView] = useState("home");
	const [activeCat, setActiveCat] = useState(null);
	const [cart, setCart] = useState({});
	const [cartOpen, setCartOpen] = useState(false);
	useEffect(() => {
		const saved = localStorage.getItem("shoply_cart");
		if (saved) setCart(JSON.parse(saved));
	}, []);
	useEffect(
		() => localStorage.setItem("shoply_cart", JSON.stringify(cart)),
		[cart]
	);

	function openCategory(cat) {
		setActiveCat(cat);
		setView("category");
		window.scrollTo(0, 0);
	}
	function addToCart(p) {
		setCart((prev) => {
			const copy = { ...prev };
			if (copy[p.id]) copy[p.id].qty += 1;
			else copy[p.id] = { ...p, qty: 1 };
			return copy;
		});
		setCartOpen(true);
	}
	function updateQty(id, qty) {
		setCart((prev) => {
			const c = { ...prev };
			if (!c[id]) return c;
			if (qty <= 0) delete c[id];
			else c[id].qty = qty;
			return c;
		});
	}
	function removeItem(id) {
		setCart((prev) => {
			const c = { ...prev };
			delete c[id];
			return c;
		});
	}

	const featured = PRODUCTS.slice(0, 8);
	return (
		<div>
			<Header
				onSearch={(q) => {
					/* search not implemented in this lightweight build */
				}}
				openCart={() => setCartOpen(true)}
			/>
			<Hero />
			<div style={{ padding: "20px 0" }} className="container">
				<CategoryGrid onSelect={openCategory} />
				{view === "home" && (
					<section style={{ marginTop: 24 }}>
						<h2>Featured</h2>
						<ProductsGrid items={featured} onAdd={addToCart} />
					</section>
				)}
				{view === "category" && (
					<section style={{ marginTop: 24 }}>
						<h2 style={{ marginBottom: 12 }}>{activeCat}</h2>
						<ProductsGrid
							items={PRODUCTS.filter((p) => p.category === activeCat)}
							onAdd={addToCart}
						/>
					</section>
				)}
			</div>
			<Chatbot />
			<CartModal
				open={cartOpen}
				onClose={() => setCartOpen(false)}
				cart={cart}
				updateQty={updateQty}
				removeItem={removeItem}
			/>
			<footer className="footer">
				<div
					className="container"
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div>
						<div style={{ fontWeight: 800 }}>Shoply</div>
						<div style={{ color: "#94a3b8" }}>
							Email: shoply@gmail.com • WhatsApp: +2348143098212
						</div>
					</div>
					<div style={{ color: "#94a3b8" }}>
						© 2025 Shoply. All rights reserved.
					</div>
				</div>
			</footer>
		</div>
	);
}
