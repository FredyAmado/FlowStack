const pptxgen = require("C:\\Users\\Usuario\\npm-global\\node_modules\\pptxgenjs");
const React = require("C:\\Users\\Usuario\\npm-global\\node_modules\\react");
const ReactDOMServer = require("C:\\Users\\Usuario\\npm-global\\node_modules\\react-dom\\server");
const sharp = require("C:\\Users\\Usuario\\npm-global\\node_modules\\sharp");
const { FaBuilding, FaRocket, FaStar, FaGlobe, FaLightbulb, FaShieldAlt, FaExclamationTriangle, FaChartLine, FaCheckCircle, FaTimesCircle, FaUsers, FaCogs, FaSearch, FaBullseye } = require("C:\\Users\\Usuario\\npm-global\\node_modules\\react-icons\\fa");

function renderIconSvg(IconComponent, color, size) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ---- Color palette ----
const C = {
  navy: "0F172A",
  teal: "0891B2",
  tealLight: "06B6D4",
  dark: "1E293B",
  light: "F8FAFC",
  white: "FFFFFF",
  muted: "94A3B8",
  gray: "64748B",
  green: "059669",
  red: "DC2626",
  amber: "D97706",
  cardBg: "FFFFFF",
  cardBorder: "E2E8F0",
};

const FONT_TITLE = "Georgia";
const FONT_BODY = "Calibri";

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 5.1, w: 9, h: 0.4,
    fontSize: 8, color: C.muted, fontFace: FONT_BODY,
    align: "center", margin: 0,
  });
}

function addCard(slide, x, y, w, h, opts) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: C.cardBg },
    shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.08 },
  });
}

function addIconCard(slide, iconData, x, y, w, title, lines, accentColor) {
  const cardH = 0.28 + 0.4 + 0.12 + lines.length * 0.28;
  addCard(slide, x, y, w, cardH);
  if (accentColor) {
    slide.addShape("rect", { x, y, w: 0.06, h: cardH, fill: { color: accentColor } });
  }
  slide.addImage({ data: iconData, x: x + 0.2, y: y + 0.2, w: 0.3, h: 0.3 });
  slide.addText(title, {
    x: x + 0.6, y: y + 0.15, w: w - 0.8, h: 0.4,
    fontSize: 11, fontFace: FONT_BODY, bold: true, color: C.dark, margin: 0,
  });
  const textItems = lines.map((l, i) => ({
    text: l,
    options: { bullet: true, breakLine: i < lines.length - 1, fontSize: 9, color: C.gray, fontFace: FONT_BODY },
  }));
  slide.addText(textItems, {
    x: x + 0.2, y: y + 0.55, w: w - 0.4, h: cardH - 0.6,
    margin: 0, valign: "top",
  });
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "FlowStack";
  pres.title = "Análisis de Competencia - FlowStack";

  // Icons
  const icons = {};
  const iconList = [
    ["building", FaBuilding, "#0891B2"],
    ["rocket", FaRocket, "#0891B2"],
    ["star", FaStar, "#D97706"],
    ["globe", FaGlobe, "#64748B"],
    ["bulb", FaLightbulb, "#059669"],
    ["shield", FaShieldAlt, "#0891B2"],
    ["warning", FaExclamationTriangle, "#DC2626"],
    ["chart", FaChartLine, "#059669"],
    ["check", FaCheckCircle, "#059669"],
    ["times", FaTimesCircle, "#DC2626"],
    ["users", FaUsers, "#64748B"],
    ["cogs", FaCogs, "#0891B2"],
    ["search", FaSearch, "#64748B"],
    ["target", FaBullseye, "#DC2626"],
  ];
  for (const [name, Component, color] of iconList) {
    icons[name] = await iconToBase64Png(Component, color, 256);
  }

  // ==== SLIDE 1: TITLE ====
  const s1 = pres.addSlide();
  s1.background = { color: C.navy };
  s1.addShape("rect", { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.teal } });
  s1.addText("ANÁLISIS DE COMPETENCIA", {
    x: 0.8, y: 1.2, w: 8.4, h: 0.8,
    fontSize: 36, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0,
  });
  s1.addText("FlowStack — Agencia de Marketing Digital con Agentes AI", {
    x: 0.8, y: 2.0, w: 8.4, h: 0.5,
    fontSize: 16, fontFace: FONT_BODY, color: C.tealLight, margin: 0,
  });
  s1.addText("Bogotá / Colombia | Junio 2026", {
    x: 0.8, y: 2.6, w: 8.4, h: 0.4,
    fontSize: 12, fontFace: FONT_BODY, color: C.muted, margin: 0,
  });
  s1.addImage({ data: icons.target, x: 4.55, y: 3.3, w: 0.9, h: 0.9 });
  s1.addText("8 competidores analizados  |  5 deep dives  | 14 slides", {
    x: 0.8, y: 4.4, w: 8.4, h: 0.4,
    fontSize: 10, fontFace: FONT_BODY, color: C.muted, align: "center", margin: 0,
  });
  addFooter(s1, "Confidencial — FlowStack © 2026");

  // ==== SLIDE 2: RESUMEN EJECUTIVO ====
  const s2 = pres.addSlide();
  s2.background = { color: C.light };
  s2.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s2.addText("Resumen Ejecutivo", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 26, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });
  s2.addText("El mercado bogotano de agencias marketing+IA tiene espacio para un competidor técnico con precios agresivos. Los líderes actuales están en Medellín, dejando a Bogotá como territorio con oportunidad.", {
    x: 0.6, y: 1.0, w: 8.8, h: 0.8,
    fontSize: 12, fontFace: FONT_BODY, color: C.gray, margin: 0,
  });

  // 3 stat callouts
  const statY = 2.0;
  const statW = 2.6;
  const statGap = 0.25;
  const stats = [
    { icon: icons.building, label: "Competidores", value: "8", sub: "Agencias marketing+IA en Colombia" },
    { icon: icons.users, label: "Clientes tope", value: "1,500+", sub: "ToGrow lidera en volumen" },
    { icon: icons.bulb, label: "Diferenciador", value: "$29/mes", sub: "FlowStack vs $3-10M consultoría" },
  ];
  for (let i = 0; i < stats.length; i++) {
    const sx = 0.6 + i * (statW + statGap);
    addCard(s2, sx, statY, statW, 1.6);
    s2.addImage({ data: stats[i].icon, x: sx + (statW - 0.4) / 2, y: statY + 0.15, w: 0.4, h: 0.4 });
    s2.addText(stats[i].value, {
      x: sx, y: statY + 0.6, w: statW, h: 0.45,
      fontSize: 28, fontFace: FONT_TITLE, color: C.navy, bold: true, align: "center", margin: 0,
    });
    s2.addText(stats[i].label, {
      x: sx, y: statY + 1.0, w: statW, h: 0.25,
      fontSize: 9, fontFace: FONT_BODY, color: C.teal, align: "center", bold: true, margin: 0,
    });
    s2.addText(stats[i].sub, {
      x: sx, y: statY + 1.2, w: statW, h: 0.3,
      fontSize: 7, fontFace: FONT_BODY, color: C.gray, align: "center", margin: 0,
    });
  }

  // Key finding box
  const keyY = 3.9;
  s2.addShape("rect", { x: 0.6, y: keyY, w: 8.8, h: 0.9, fill: { color: C.navy } });
  s2.addShape("rect", { x: 0.6, y: keyY, w: 0.06, h: 0.9, fill: { color: C.teal } });
  s2.addText("Hallazgo clave", {
    x: 0.85, y: keyY + 0.05, w: 8.3, h: 0.25,
    fontSize: 10, fontFace: FONT_BODY, color: C.teal, bold: true, margin: 0,
  });
  s2.addText("Ningún competidor combina las 3 cosas que FlowStack ofrece: agentes AI especializados (5 roles), stack moderno (Next.js + OpenRouter) y costo operativo bajo al no depender de WordPress ni equipos grandes.", {
    x: 0.85, y: keyY + 0.3, w: 8.3, h: 0.5,
    fontSize: 9, fontFace: FONT_BODY, color: C.white, margin: 0,
  });
  addFooter(s2, "Fuente: Scraping directo de sitios web, junio 2026");

  // ==== SLIDE 3: TABLA COMPARATIVA (PARTE 1) ====
  const s3 = pres.addSlide();
  s3.background = { color: C.light };
  s3.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s3.addText("Panorama Competitivo", {
    x: 0.6, y: 0.25, w: 8.8, h: 0.5,
    fontSize: 24, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });

  const headerOpts = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 8, fontFace: FONT_BODY, align: "center", valign: "middle" };
  const cellOpts = { fontSize: 7.5, fontFace: FONT_BODY, color: C.dark, valign: "middle", align: "center" };
  const flowOpts = { fontSize: 7.5, fontFace: FONT_BODY, color: C.white, valign: "middle", align: "center", fill: { color: C.teal }, bold: true };

  const competitors1 = [
    ["Competidor", "Ciudad", "Años", "Clientes", "Agentes IA", "Herramientas Propias"],
    ["btodigital", "Medellín", "10+", "400+", "Claude", "Ranqio, ShopiUP"],
    ["ToGrow", "Medellín", "12", "1,500+", "5 agentes", "Smart Go Up"],
    ["Asisomos", "Bogotá", "11+", "50+", "General", "—"],
    ["ON Digital", "Bogotá/Orlando", "20", "100+", "No", "—"],
    ["NeuroAgentes", "Colombia", "?", "?", "Sí", "—"],
    ["Eagencia", "Colombia", "?", "?", "Sí", "SmartBizz"],
    ["FlowStack", "Bogotá", "0", "0", "5 especializados", "Ruflo, campaign, design"],
  ];

  const tableRows1 = competitors1.map((row, i) => {
    if (i === 0) return row.map(h => ({ text: h, options: headerOpts }));
    const opts = row[0] === "FlowStack" ? flowOpts : cellOpts;
    return row.map(c => ({ text: c, options: opts }));
  });

  s3.addTable(tableRows1, {
    x: 0.6, y: 0.95, w: 8.8,
    colW: [1.3, 0.9, 0.55, 0.65, 1.05, 1.8],
    rowH: [0.35, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32],
    border: { pt: 0.5, color: C.cardBorder },
  });

  s3.addText("FlowStack destacado en teal", {
    x: 0.6, y: 4.5, w: 8.8, h: 0.3,
    fontSize: 8, fontFace: FONT_BODY, color: C.gray, italic: true, margin: 0,
  });
  addFooter(s3, "Datos recopilados de sitios web oficiales, junio 2026");

  // ==== SLIDE 4: TABLA COMPARATIVA (PARTE 2 - SERVICIOS) ====
  const s4 = pres.addSlide();
  s4.background = { color: C.light };
  s4.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s4.addText("Servicios por Competidor", {
    x: 0.6, y: 0.25, w: 8.8, h: 0.5,
    fontSize: 24, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });

  const svcHeader = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 8, fontFace: FONT_BODY, align: "center", valign: "middle" };
  const svcCell = { fontSize: 7.5, fontFace: FONT_BODY, color: C.dark, valign: "middle" };
  const svcFlow = { fontSize: 7.5, fontFace: FONT_BODY, color: C.white, valign: "middle", fill: { color: C.teal }, bold: true };

  const services = [
    ["Servicio", "btodigital", "ToGrow", "Asisomos", "ON Digital", "FlowStack"],
    ["SEO", "✓", "✓", "✓", "✓", "✓"],
    ["Pauta Digital (Ads)", "✓", "✓", "✓", "✓", "✓"],
    ["Marketing de Contenidos", "✓", "✓", "✓", "✗", "✓"],
    ["Desarrollo Web", "✓ WP", "✓ React", "✓ WP", "✓ WP", "✓ Next.js"],
    ["E-commerce", "✓ Shopify", "✓", "✓ Woo", "✓", "✗"],
    ["Agentes IA", "✓ Claude", "✓ 5 agentes", "✓ Genérico", "✗", "✓ 5 roles"],
    ["Automatización", "✓ Ranqio", "✓ Smart Go Up", "✓ Básica", "✗", "✓ n8n + CLI"],
    ["Branding", "✓", "✓", "✓", "✗", "✓"],
    ["Marketing Médico", "✓", "✗", "✓ Fuerte", "✗", "✗"],
    ["App/Software Propio", "✓ 3 apps", "✓ Smart Go Up", "✗", "✗", "✓ 3 tools"],
  ];

  const svcRows = services.map((row, i) => {
    if (i === 0) return row.map(h => ({ text: h, options: svcHeader }));
    const opts = i === services.length - 1 ? svcFlow : svcCell;
    return row.map(c => ({ text: c, options: { ...opts, align: "center" } }));
  });

  s4.addTable(svcRows, {
    x: 0.6, y: 0.95, w: 8.8,
    colW: [1.6, 1.2, 1.2, 1.2, 1.2, 1.2],
    rowH: [0.3, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.3],
    border: { pt: 0.5, color: C.cardBorder },
  });
  addFooter(s4, "✓ = Ofrece el servicio | ✗ = No lo ofrece");

  // ==== SLIDE 5: btodigital DEEP DIVE ====
  const s5 = pres.addSlide();
  s5.background = { color: C.light };
  s5.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s5.addImage({ data: icons.building, x: 0.6, y: 0.3, w: 0.45, h: 0.45 });
  s5.addText("btodigital", {
    x: 1.15, y: 0.3, w: 4, h: 0.5,
    fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });
  s5.addText("Medellín · 10+ años · 400+ clientes · Google Partner Premier", {
    x: 1.15, y: 0.7, w: 6, h: 0.3,
    fontSize: 9, fontFace: FONT_BODY, color: C.gray, margin: 0,
  });

  // Left column - strengths
  s5.addText("Fortalezas", {
    x: 0.6, y: 1.15, w: 4.1, h: 0.3,
    fontSize: 12, fontFace: FONT_BODY, color: C.green, bold: true, margin: 0,
  });
  const btoStrengths = [
    "Herramientas SAAS propias: Ranqio (SEO IA), ShopiUP (Shopify IA)",
    "Casos de éxito cuantificables: UPB (+153%), EIA (1,313% ROAS)",
    "141 reseñas 5.0★ en Google — marca consolidada",
    "Clientes grandes: Hyundai, Grupo Argos, Celsia, B.Braun",
    "Google Partner Premier + Shopify Partner",
  ];
  s5.addText(btoStrengths.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < btoStrengths.length - 1, fontSize: 8.5, color: C.dark, fontFace: FONT_BODY },
  })), { x: 0.6, y: 1.45, w: 4.1, h: 1.8, margin: 0, valign: "top" });

  // Right column - weaknesses
  s5.addText("Debilidades", {
    x: 5.2, y: 1.15, w: 4.2, h: 0.3,
    fontSize: 12, fontFace: FONT_BODY, color: C.red, bold: true, margin: 0,
  });
  const btoWeaknesses = [
    "Ubicada en Medellín — sin presencia en Bogotá",
    "Stack WordPress/Shopify tradicional",
    "No revelan precios — barrera de entrada",
    "Aceptan solo 3 nuevos clientes al mes",
    "Dependencia de plataformas terceras (Clientify, Google)",
  ];
  s5.addText(btoWeaknesses.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < btoWeaknesses.length - 1, fontSize: 8.5, color: C.dark, fontFace: FONT_BODY },
  })), { x: 5.2, y: 1.45, w: 4.2, h: 1.8, margin: 0, valign: "top" });

  // Bottom: stack box
  const btoStackY = 3.5;
  s5.addShape("rect", { x: 0.6, y: btoStackY, w: 8.8, h: 0.75, fill: { color: C.navy } });
  s5.addShape("rect", { x: 0.6, y: btoStackY, w: 0.06, h: 0.75, fill: { color: C.teal } });
  s5.addText("Stack: Claude · Gemini · WordPress · Shopify · Clientify · Google Cloud", {
    x: 0.85, y: btoStackY + 0.1, w: 8.3, h: 0.25,
    fontSize: 9, fontFace: FONT_BODY, color: C.tealLight, margin: 0,
  });
  s5.addText("Ventaja FlowStack: Stack moderno (Next.js + OpenRouter) con costos operativos mucho menores. btodigital gasta en WordPress, Shopify, Clientify, Google Cloud — nosotros tenemos todo en VPS + n8n.", {
    x: 0.85, y: btoStackY + 0.35, w: 8.3, h: 0.3,
    fontSize: 8, fontFace: FONT_BODY, color: C.white, margin: 0,
  });
  addFooter(s5, "btodigital.com | Scraped junio 2026");

  // ==== SLIDE 6: ToGrow DEEP DIVE ====
  const s6 = pres.addSlide();
  s6.background = { color: C.light };
  s6.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s6.addImage({ data: icons.rocket, x: 0.6, y: 0.3, w: 0.45, h: 0.45 });
  s6.addText("ToGrow", {
    x: 1.15, y: 0.3, w: 4, h: 0.5,
    fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });
  s6.addText("Medellín · 12 años · 1,500+ clientes · 25 expertos · +10 países", {
    x: 1.15, y: 0.7, w: 7, h: 0.3,
    fontSize: 9, fontFace: FONT_BODY, color: C.gray, margin: 0,
  });

  s6.addText("Fortalezas", {
    x: 0.6, y: 1.15, w: 4.1, h: 0.3,
    fontSize: 12, fontFace: FONT_BODY, color: C.green, bold: true, margin: 0,
  });
  const tgStrengths = [
    "5 agentes IA propios operando internamente",
    "Smart Go Up: plataforma centralizada WhatsApp/CRM/agenda/cobros",
    "Presencia en USA (+1 954 932 5572) — alcance internacional",
    "Crecimiento anual 30% últimos 5 años (auto-reportado)",
    "Stack variado: React, AWS, WordPress, Meta, Google",
  ];
  s6.addText(tgStrengths.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < tgStrengths.length - 1, fontSize: 8.5, color: C.dark, fontFace: FONT_BODY },
  })), { x: 0.6, y: 1.45, w: 4.1, h: 1.8, margin: 0, valign: "top" });

  s6.addText("Debilidades", {
    x: 5.2, y: 1.15, w: 4.2, h: 0.3,
    fontSize: 12, fontFace: FONT_BODY, color: C.red, bold: true, margin: 0,
  });
  const tgWeaknesses = [
    "Medellín — sin presencia física en Bogotá",
    "Sitio web WordPress con Elementor (pesado, lento)",
    "Precios no públicos — sin transparencia",
    "Muchos logos de clientes sin nombres reconocibles",
    "Stack fragmentado (WordPress + React = mantenimiento doble)",
  ];
  s6.addText(tgWeaknesses.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < tgWeaknesses.length - 1, fontSize: 8.5, color: C.dark, fontFace: FONT_BODY },
  })), { x: 5.2, y: 1.45, w: 4.2, h: 1.8, margin: 0, valign: "top" });

  const tgStackY = 3.5;
  s6.addShape("rect", { x: 0.6, y: tgStackY, w: 8.8, h: 0.75, fill: { color: C.navy } });
  s6.addShape("rect", { x: 0.6, y: tgStackY, w: 0.06, h: 0.75, fill: { color: C.teal } });
  s6.addText("Stack: React · AWS · WordPress · Elementor · Meta · Google · Ahrefs · ClickUp · ChatGPT", {
    x: 0.85, y: tgStackY + 0.1, w: 8.3, h: 0.25,
    fontSize: 9, fontFace: FONT_BODY, color: C.tealLight, margin: 0,
  });
  s6.addText("Ventaja FlowStack: ToGrow tiene 5 agentes IA pero con stack fragmentado. FlowStack ofrece agentes especializados con stack unificado (Next.js + n8n + OpenRouter) a menor costo.", {
    x: 0.85, y: tgStackY + 0.35, w: 8.3, h: 0.3,
    fontSize: 8, fontFace: FONT_BODY, color: C.white, margin: 0,
  });
  addFooter(s6, "togrowagencia.com | Scraped junio 2026");

  // ==== SLIDE 7: Asisomos DEEP DIVE ====
  const s7 = pres.addSlide();
  s7.background = { color: C.light };
  s7.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s7.addImage({ data: icons.star, x: 0.6, y: 0.3, w: 0.45, h: 0.45 });
  s7.addText("Asisomos", {
    x: 1.15, y: 0.3, w: 4, h: 0.5,
    fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });
  s7.addText("Bogotá · 11+ años · Clientes: Grupo Éxito, Pavco, BID", {
    x: 1.15, y: 0.7, w: 7, h: 0.3,
    fontSize: 9, fontFace: FONT_BODY, color: C.gray, margin: 0,
  });

  s7.addText("Fortalezas", {
    x: 0.6, y: 1.15, w: 4.1, h: 0.3,
    fontSize: 12, fontFace: FONT_BODY, color: C.green, bold: true, margin: 0,
  });
  const asStrengths = [
    "Ubicación en Bogotá — mismo mercado objetivo de FlowStack",
    "Especialización fuerte en marketing médico (ventaja en salud)",
    "Clientes corporativos grandes: Grupo Éxito, Pavco, BID, Orbia",
    "Amplio portafolio de servicios tradicionales (branding, web, SEO, pauta)",
    "11 años de contenido en blog — autoridad SEO",
  ];
  s7.addText(asStrengths.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < asStrengths.length - 1, fontSize: 8.5, color: C.dark, fontFace: FONT_BODY },
  })), { x: 0.6, y: 1.45, w: 4.1, h: 1.8, margin: 0, valign: "top" });

  s7.addText("Debilidades", {
    x: 5.2, y: 1.15, w: 4.2, h: 0.3,
    fontSize: 12, fontFace: FONT_BODY, color: C.red, bold: true, margin: 0,
  });
  const asWeaknesses = [
    "Stack WordPress tradicional — sin IA real incorporada",
    "No hay agentes IA especializados (solo automatización genérica)",
    "Sin herramientas SAAS propias",
    "Foco principal en marketing médico — nicho limitado",
    "Precios no públicos",
  ];
  s7.addText(asWeaknesses.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < asWeaknesses.length - 1, fontSize: 8.5, color: C.dark, fontFace: FONT_BODY },
  })), { x: 5.2, y: 1.45, w: 4.2, h: 1.8, margin: 0, valign: "top" });

  const asStackY = 3.5;
  s7.addShape("rect", { x: 0.6, y: asStackY, w: 8.8, h: 0.75, fill: { color: C.navy } });
  s7.addShape("rect", { x: 0.6, y: asStackY, w: 0.06, h: 0.75, fill: { color: C.teal } });
  s7.addText("Stack: WordPress · Google · Meta · Shopify · WooCommerce", {
    x: 0.85, y: asStackY + 0.1, w: 8.3, h: 0.25,
    fontSize: 9, fontFace: FONT_BODY, color: C.tealLight, margin: 0,
  });
  s7.addText("Ventaja FlowStack: Asisomos es el competidor más directo (Bogotá, marketing digital) pero sin IA real. FlowStack ofrece lo mismo + agentes IA especializados + automatización real + precios transparentes.", {
    x: 0.85, y: asStackY + 0.35, w: 8.3, h: 0.3,
    fontSize: 8, fontFace: FONT_BODY, color: C.white, margin: 0,
  });
  addFooter(s7, "asisomos.co | Scraped junio 2026");

  // ==== SLIDE 8: ON Digital DEEP DIVE ====
  const s8 = pres.addSlide();
  s8.background = { color: C.light };
  s8.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s8.addImage({ data: icons.globe, x: 0.6, y: 0.3, w: 0.45, h: 0.45 });
  s8.addText("ON Digital", {
    x: 1.15, y: 0.3, w: 4, h: 0.5,
    fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });
  s8.addText("Bogotá + Orlando · 20 años · ProColombia · 4.8★ Clutch", {
    x: 1.15, y: 0.7, w: 7, h: 0.3,
    fontSize: 9, fontFace: FONT_BODY, color: C.gray, margin: 0,
  });

  s8.addText("Fortalezas", {
    x: 0.6, y: 1.15, w: 4.1, h: 0.3,
    fontSize: 12, fontFace: FONT_BODY, color: C.green, bold: true, margin: 0,
  });
  const onStrengths = [
    "20 años de experiencia — la más veterana del análisis",
    "Presencia internacional: Bogotá + Orlando, Florida",
    "Clientes corporativos: MAPFRE, Cencosud, Sony Music",
    "ProColombia — respaldo gubernamental",
    "4.8★ en Clutch con reseñas verificadas",
  ];
  s8.addText(onStrengths.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < onStrengths.length - 1, fontSize: 8.5, color: C.dark, fontFace: FONT_BODY },
  })), { x: 0.6, y: 1.45, w: 4.1, h: 1.8, margin: 0, valign: "top" });

  s8.addText("Debilidades", {
    x: 5.2, y: 1.15, w: 4.2, h: 0.3,
    fontSize: 12, fontFace: FONT_BODY, color: C.red, bold: true, margin: 0,
  });
  const onWeaknesses = [
    "No ofrecen agentes IA — stack puramente tradicional",
    "Sin herramientas tecnológicas propias",
    "Sitio web desactualizado (WordPress antiguo)",
    "Equipo pequeño — sin escalabilidad aparente",
    "Foco en PYMES pero con precios de agencia tradicional",
  ];
  s8.addText(onWeaknesses.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < onWeaknesses.length - 1, fontSize: 8.5, color: C.dark, fontFace: FONT_BODY },
  })), { x: 5.2, y: 1.45, w: 4.2, h: 1.8, margin: 0, valign: "top" });

  const onStackY = 3.5;
  s8.addShape("rect", { x: 0.6, y: onStackY, w: 8.8, h: 0.75, fill: { color: C.navy } });
  s8.addShape("rect", { x: 0.6, y: onStackY, w: 0.06, h: 0.75, fill: { color: C.teal } });
  s8.addText("Stack: Google Analytics · Semrush · Metricool · Trello · Nifty · ChatGPT básico", {
    x: 0.85, y: onStackY + 0.1, w: 8.3, h: 0.25,
    fontSize: 9, fontFace: FONT_BODY, color: C.tealLight, margin: 0,
  });
  s8.addText("Ventaja FlowStack: ON Digital es el más vulnerable — 20 años en el mercado pero sin IA, sin herramientas propias, sin stack moderno. FlowStack entra con tecnología muy superior a fracción del costo.", {
    x: 0.85, y: onStackY + 0.35, w: 8.3, h: 0.3,
    fontSize: 8, fontFace: FONT_BODY, color: C.white, margin: 0,
  });
  addFooter(s8, "ondigital.co | Scraped junio 2026");

  // ==== SLIDE 9: STACK TECNOLÓGICO COMPARADO ====
  const s9 = pres.addSlide();
  s9.background = { color: C.light };
  s9.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s9.addText("Stack Tecnológico por Competidor", {
    x: 0.6, y: 0.25, w: 8.8, h: 0.5,
    fontSize: 24, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });

  const stkHeader = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 8, fontFace: FONT_BODY, align: "center", valign: "middle" };
  const stkCell = { fontSize: 7.5, fontFace: FONT_BODY, color: C.dark, valign: "middle" };
  const stkFlow = { fontSize: 7.5, fontFace: FONT_BODY, color: C.white, valign: "middle", fill: { color: C.teal }, bold: true };

  const stacks = [
    ["Componente", "btodigital", "ToGrow", "Asisomos", "ON Digital", "FlowStack"],
    ["CMS/Frontend", "WordPress", "WP+React", "WordPress", "WordPress", "Next.js 14"],
    ["AI/LLM", "Claude", "ChatGPT", "ChatGPT", "No usa", "OpenRouter"],
    ["CRM", "Clientify", "Smart Go Up", "Genérico", "No", "Propio"],
    ["Automatización", "Ranqio", "5 agentes", "Básica", "No", "n8n + CLI"],
    ["Base de datos", "—", "—", "—", "—", "PostgreSQL"],
    ["Infraestructura", "Google Cloud", "AWS", "Hosting", "Hosting", "VPS+Coolify"],
    ["Herramientas", "Ranqio,ShopiUP", "Smart Go Up", "Ninguna", "Ninguna", "Ruflo+CLIs"],
  ];

  const stkRows = stacks.map((row, i) => {
    if (i === 0) return row.map(h => ({ text: h, options: stkHeader }));
    const opts = i === stacks.length - 1 ? stkFlow : stkCell;
    return row.map(c => ({ text: c, options: { ...opts, align: "center" } }));
  });

  s9.addTable(stkRows, {
    x: 0.6, y: 0.95, w: 8.8,
    colW: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
    rowH: [0.3, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.35],
    border: { pt: 0.5, color: C.cardBorder },
  });

  s9.addText("FlowStack es el único con stack moderno (Next.js + PostgreSQL) y multi-modelo LLM. Los competidores usan WordPress como base.", {
    x: 0.6, y: 4.3, w: 8.8, h: 0.4,
    fontSize: 9, fontFace: FONT_BODY, color: C.gray, italic: true, margin: 0,
  });
  addFooter(s9, "Comparativa técnica basada en scraping de sitios web");

  // ==== SLIDE 10: FORTALEZAS DE FLOWSTACK ====
  const s10 = pres.addSlide();
  s10.background = { color: C.light };
  s10.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s10.addImage({ data: icons.shield, x: 0.6, y: 0.3, w: 0.45, h: 0.45 });
  s10.addText("Ventajas Competitivas de FlowStack", {
    x: 1.15, y: 0.3, w: 7, h: 0.5,
    fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });

  const advHeader = { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 8, fontFace: FONT_BODY, valign: "middle" };
  const advCell = { fontSize: 7.5, fontFace: FONT_BODY, color: C.dark, valign: "middle" };
  const advCellFlow = { fontSize: 7.5, fontFace: FONT_BODY, color: C.white, valign: "middle", fill: { color: C.teal }, bold: true };

  const advData = [
    ["Dimensión", "Competencia", "FlowStack"],
    ["Precio", "No público ($3-10M/mes)", "$29/mes — público y fijo"],
    ["Stack", "WordPress/Shopify/Legacy", "Next.js 14 + OpenRouter"],
    ["Agentes IA", "1-2 genéricos", "5 especializados (Mark, Andy, Barry, Brayan, Frank)"],
    ["Herramientas propias", "Solo btodigital y ToGrow", "Ruflo + campaign-cli + design-cli"],
    ["Ubicación", "Medellín (líderes) o Bogotá (legacy)", "Bogotá + remoto"],
    ["Transparencia", "Ninguno publica precios", "Planes desde $0"],
    ["Contratos", "Consultoría upfront", "SaaS mensual sin compromiso"],
  ];

  const advRows = advData.map((row, i) => {
    if (i === 0) return row.map(h => ({ text: h, options: advHeader }));
    const opts = i === advData.length - 1 ? advCellFlow : advCell;
    return row.map((c, j) => ({ text: c, options: { ...opts, align: j === 0 ? "left" : "center", bold: j === 2 } }));
  });

  s10.addTable(advRows, {
    x: 0.6, y: 1.0, w: 8.8,
    colW: [1.4, 3.5, 3.5],
    rowH: [0.3, 0.35, 0.35, 0.4, 0.35, 0.35, 0.35, 0.35],
    border: { pt: 0.5, color: C.cardBorder },
  });

  s10.addImage({ data: icons.bulb, x: 0.6, y: 4.3, w: 0.3, h: 0.3 });
  s10.addText("FlowStack compite en precio, tecnología y ubicación. La combinación stack moderno + precios bajos + Bogotá es única.", {
    x: 1.0, y: 4.3, w: 8, h: 0.4,
    fontSize: 9, fontFace: FONT_BODY, color: C.gray, italic: true, margin: 0,
  });
  addFooter(s10, "Análisis comparativo FlowStack 2026");

  // ==== SLIDE 11: AMENAZAS ====
  const s11 = pres.addSlide();
  s11.background = { color: C.light };
  s11.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.red } });
  s11.addImage({ data: icons.warning, x: 0.6, y: 0.3, w: 0.45, h: 0.45 });
  s11.addText("Riesgos y Amenazas", {
    x: 1.15, y: 0.3, w: 8, h: 0.5,
    fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });

  const riskHeader = { fill: { color: C.red }, color: C.white, bold: true, fontSize: 8, fontFace: FONT_BODY, align: "left", valign: "middle" };
  const riskCell = { fontSize: 7.5, fontFace: FONT_BODY, color: C.dark, valign: "middle" };

  const risks = [
    ["Riesgo", "Detalle", "Mitigación"],
    ["btodigital llega a Bogotá", "Tiene marca, casos de éxito, Partner Premier", "Construir presencia local antes, precios transparentes"],
    ["ToGrow escala sus agentes", "Ya tiene 5 agentes IA + Smart Go Up", "Enfocarse en calidad y personalización vs cantidad"],
    ["Guerra de precios", "Si bajan a $29/mes", "Competir en especialización técnica y atención"],
    ["Falta de casos de éxito", "0 clientes vs 400+ de competidores", "Onboarding gratis a 3 startups a cambio de caso de estudio"],
    ["Marca nueva vs 10-20 años", "Percepción de riesgo en clientes", "SEO local, contenido educativo, alianzas estratégicas"],
  ];

  const riskRows = risks.map((row, i) => {
    if (i === 0) return row.map(h => ({ text: h, options: riskHeader }));
    return row.map((c, j) => ({ text: c, options: { ...riskCell, align: j === 0 ? "left" : "left", bold: j === 0 } }));
  });

  s11.addTable(riskRows, {
    x: 0.6, y: 1.0, w: 8.8,
    colW: [1.5, 3.5, 3.5],
    rowH: [0.3, 0.45, 0.45, 0.45, 0.5, 0.5],
    border: { pt: 0.5, color: C.cardBorder },
  });
  addFooter(s11, "Análisis de riesgos estratégico");

  // ==== SLIDE 12: BRECHAS DE MERCADO ====
  const s12 = pres.addSlide();
  s12.background = { color: C.light };
  s12.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.green } });
  s12.addImage({ data: icons.chart, x: 0.6, y: 0.3, w: 0.45, h: 0.45 });
  s12.addText("Brechas de Mercado para FlowStack", {
    x: 1.15, y: 0.3, w: 8, h: 0.5,
    fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0,
  });

  const gaps = [
    { title: "Precios transparentes", desc: "Ningún competidor publica precios. FlowStack sí ($0/$29/custom). Ventaja psicológica enorme.", icon: icons.check },
    { title: "Marketing + automatización real", desc: "La mayoría ofrece consultoría + WordPress. FlowStack ofrece automatización real con n8n + agentes.", icon: icons.cogs },
    { title: "Bogotá + stack moderno", desc: "Las agencias IA de Medellín tienen poca presencia en Bogotá. Las de Bogotá tienen stack WordPress sin IA real.", icon: icons.search },
    { title: "Agentes con personalidad", desc: "FlowStack tiene 5 agentes con roles específicos. Ningún competidor tiene agentes con identidad propia.", icon: icons.users },
    { title: "Sin cuotas ni contratos", desc: "Modelo SaaS puro vs agencias que cobran consultoría upfront. Barrera de entrada mucho menor.", icon: icons.bulb },
  ];

  for (let i = 0; i < gaps.length; i++) {
    const gy = 1.05 + i * 0.82;
    addCard(s12, 0.6, gy, 8.8, 0.7);
    s12.addShape("rect", { x: 0.6, y: gy, w: 0.06, h: 0.7, fill: { color: C.green } });
    s12.addImage({ data: gaps[i].icon, x: 0.85, y: gy + 0.15, w: 0.35, h: 0.35 });
    s12.addText(gaps[i].title, {
      x: 1.35, y: gy + 0.05, w: 7.8, h: 0.3,
      fontSize: 11, fontFace: FONT_BODY, color: C.dark, bold: true, margin: 0,
    });
    s12.addText(gaps[i].desc, {
      x: 1.35, y: gy + 0.32, w: 7.8, h: 0.3,
      fontSize: 8.5, fontFace: FONT_BODY, color: C.gray, margin: 0,
    });
  }
  addFooter(s12, "5 brechas identificadas en el mercado colombiano");

  // ==== SLIDE 13: MAPA DE POSICIONAMIENTO ====
  const s13 = pres.addSlide();
  s13.background = { color: C.navy };
  s13.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s13.addText("Mapa de Posicionamiento", {
    x: 0.6, y: 0.3, w: 8.8, h: 0.55,
    fontSize: 24, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0,
  });

  // Matrix background
  const mx = 1.0, my = 1.3, mw = 8.0, mh = 3.3;
  s13.addShape("rect", { x: mx, y: my, w: mw, h: mh, fill: { color: "1A2744" } });
  // Grid lines
  s13.addShape("line", { x: mx + mw / 2, y: my, w: 0, h: mh, line: { color: C.muted, width: 0.5, dashType: "dash" } });
  s13.addShape("line", { x: mx, y: my + mh / 2, w: mw, h: 0, line: { color: C.muted, width: 0.5, dashType: "dash" } });
  // Labels
  s13.addText("Precio Alto", { x: mx, y: my - 0.35, w: mw / 2, h: 0.25, fontSize: 8, color: C.muted, fontFace: FONT_BODY, align: "center", margin: 0 });
  s13.addText("Precio Bajo", { x: mx + mw / 2, y: my + mh + 0.05, w: mw / 2, h: 0.25, fontSize: 8, color: C.muted, fontFace: FONT_BODY, align: "center", margin: 0 });
  s13.addText("← Baja IA", { x: mx - 0.5, y: my + mh / 2 - 0.15, w: 0.5, h: 0.3, fontSize: 7, color: C.muted, fontFace: FONT_BODY, align: "right", margin: 0 });
  s13.addText("Alta IA →", { x: mx + mw, y: my + mh / 2 - 0.15, w: 0.5, h: 0.3, fontSize: 7, color: C.muted, fontFace: FONT_BODY, margin: 0 });

  // Plot competitors as dots
  const plot = (lx, ly, label, color, isFlow) => {
    const px = mx + lx * mw;
    const py = my + ly * mh;
    const dotR = isFlow ? 0.22 : 0.15;
    s13.addShape("oval", { x: px - dotR / 2, y: py - dotR / 2, w: dotR, h: dotR, fill: { color } });
    s13.addText(label, {
      x: px + 0.2, y: py - 0.12, w: 1.5, h: 0.25,
      fontSize: 7, fontFace: FONT_BODY, color: C.white, margin: 0,
    });
  };

  // Position: x=especialización IA, y=precio (0=alto, 1=bajo)
  plot(0.15, 0.25, "btodigital", "CADCFC");
  plot(0.2, 0.3, "ToGrow", "CADCFC");
  plot(0.1, 0.35, "Asisomos", "CADCFC");
  plot(0.05, 0.4, "ON Digital", "CADCFC");
  plot(0.75, 0.75, "FlowStack", C.tealLight, true);

  s13.addText("FlowStack se posiciona en el cuadrante ideal: alta especialización IA + precio bajo. Único competidor en ese espacio.", {
    x: 0.6, y: 4.8, w: 8.8, h: 0.4,
    fontSize: 9, fontFace: FONT_BODY, color: C.tealLight, italic: true, align: "center", margin: 0,
  });
  addFooter(s13, "Matriz precio vs especialización técnica en IA");

  // ==== SLIDE 14: CONCLUSIÓN ====
  const s14 = pres.addSlide();
  s14.background = { color: C.navy };
  s14.addShape("rect", { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.teal } });
  s14.addText("Conclusión y Nicho Recomendado", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0,
  });

  const recs = [
    { label: "Precio", value: "$29/mes vs miles en consultoría" },
    { label: "Stack", value: "Next.js + OpenRouter + n8n vs WordPress + ChatGPT" },
    { label: "Ubicación", value: "Bogotá vs Medellín (btodigital, ToGrow)" },
    { label: "Agentes", value: "5 especializados con personalidades vs 1-2 genéricos" },
  ];

  for (let i = 0; i < recs.length; i++) {
    const ry = 1.4 + i * 0.65;
    s14.addShape("rect", { x: 0.8, y: ry, w: 8.4, h: 0.5, fill: { color: "1A2744" } });
    s14.addShape("rect", { x: 0.8, y: ry, w: 0.06, h: 0.5, fill: { color: C.teal } });
    s14.addText(recs[i].label, {
      x: 1.1, y: ry + 0.05, w: 1.5, h: 0.4,
      fontSize: 11, fontFace: FONT_BODY, color: C.teal, bold: true, margin: 0, valign: "middle",
    });
    s14.addText(recs[i].value, {
      x: 2.6, y: ry + 0.05, w: 6.3, h: 0.4,
      fontSize: 11, fontFace: FONT_BODY, color: C.white, margin: 0, valign: "middle",
    });
  }

  s14.addShape("rect", { x: 0.8, y: 4.2, w: 8.4, h: 0.7, fill: { color: C.teal } });
  s14.addText("Objetivo inmediato: Conseguir 3-5 clientes en Bogotá como casos de estudio, construir SEO local, y escalar desde ahí.", {
    x: 1.0, y: 4.25, w: 8, h: 0.6,
    fontSize: 11, fontFace: FONT_BODY, color: C.white, margin: 0, valign: "middle",
  });

  s14.addText("No competir en: volumen de clientes, casos de éxito previos o reconocimiento de marca.", {
    x: 0.8, y: 5.1, w: 8.4, h: 0.3,
    fontSize: 9, fontFace: FONT_BODY, color: C.muted, textAlign: "center", margin: 0,
  });

  // Write file
  await pres.writeFile({ fileName: "C:\\Users\\Usuario\\Documents\\opencode\\flowstack\\FlowStack-Competencia-Analisis.pptx" });
  console.log("Presentación creada exitosamente!");
}

main().catch(console.error);
