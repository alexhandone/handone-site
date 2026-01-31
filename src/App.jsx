import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const App = () => {
  const [isFloating, setIsFloating] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sliderRef = useRef(null)
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const hoverLift = { y: -6 }
  const hoverSpring = { type: 'spring', stiffness: 220, damping: 20 }
  const viewport = { once: true, amount: 0.2 }
  const menuVariants = {
    open: { opacity: 1, y: 0, pointerEvents: 'auto', transition: { duration: 0.2, ease: 'easeOut' } },
    closed: { opacity: 0, y: -12, pointerEvents: 'none', transition: { duration: 0.2, ease: 'easeIn' } },
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsFloating(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 960) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', closeOnResize)

    return () => window.removeEventListener('resize', closeOnResize)
  }, [])

  const handleSliderMove = (direction) => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: direction * 260, behavior: 'smooth' })
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="ambient">
        <span className="orb orb--amber"></span>
        <span className="orb orb--sky"></span>
        <span className="grid"></span>
      </div>

      <header className={`site-header${isFloating ? ' is-floating' : ''}${menuOpen ? ' menu-open' : ''}`}>
        <nav className="nav">
          <a className="brand" href="#inicio">Handone</a>
          <div className="nav-links">
            <a href="#servicos">Servicos</a>
            <a href="#portfolio">Clientes</a>
            <a href="#sobre">Sobre</a>
            <a href="#depoimentos">Depoimentos</a>
          </div>
          <div className="nav-actions">
            <a className="cta nav-cta" href="#contato">Quero gerar impacto</a>
            <a className="cta nav-cta-mobile" href="#contato">Contato</a>
            <button
              className="nav-toggle"
              type="button"
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <line x1="5" y1="7" x2="19" y2="7"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <line x1="5" y1="17" x2="19" y2="17"></line>
              </svg>
            </button>
          </div>
        </nav>
        <motion.div
          id="mobile-menu"
          className="mobile-menu"
          aria-hidden={!menuOpen}
          initial="closed"
          animate={menuOpen ? 'open' : 'closed'}
          variants={menuVariants}
        >
          <a href="#servicos" onClick={closeMenu}>Servicos</a>
          <a href="#portfolio" onClick={closeMenu}>Clientes</a>
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="#depoimentos" onClick={closeMenu}>Depoimentos</a>
          <a className="cta" href="#contato" onClick={closeMenu}>Quero gerar impacto</a>
        </motion.div>
      </header>

      <main id="inicio">
        <motion.section className="hero" variants={stagger} initial="hidden" animate="show">
          <div className="hero-content">
            <motion.p className="eyebrow" variants={fadeUp}>Agencia de criacao de sites</motion.p>
            <motion.h1 variants={fadeUp}>Soluções digitais sob medida </motion.h1>
            <motion.p className="lead" variants={fadeUp}>Parceiros oficiais da Nuvemshop, especialistas em transformar ideias em negócios digitais prontos para escalar.</motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="cta" href="#contato">Quero gerar impacto</a>
              <a className="ghost" href="#portfolio">Ver portfolio</a>
            </motion.div>
            <motion.div className="hero-metrics" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="metric">100+</span>
                <span className="metric-label">Projetos entregues</span>
              </motion.div>
              <motion.div variants={fadeUp}>
                <span className="metric">81k</span>
                <span className="metric-label">Visitas geradas</span>
              </motion.div>
              <motion.div variants={fadeUp}>
                <span className="metric">18 anos</span>
                <span className="metric-label">Experiencia combinada</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="portfolio" className="portfolio" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.div className="section-header" variants={fadeUp}>
            <h2>Conheca alguns sites que ja desenvolvemos</h2>
            <div className="controls">
              <button className="slider-btn" data-direction="prev" aria-label="Anterior" onClick={() => handleSliderMove(-1)}>&#x2190;</button>
              <button className="slider-btn" data-direction="next" aria-label="Proximo" onClick={() => handleSliderMove(1)}>&#x2192;</button>
            </div>
          </motion.div>
          <motion.div className="slider-wrap" ref={sliderRef} variants={fadeUp}>
            <motion.div className="slider" variants={stagger}>
              <motion.article className="shot" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
                <span>Startup SaaS</span>
                <h3>Interface clara para onboarding</h3>
              </motion.article>
              <motion.article className="shot" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
                <span>Clinica</span>
                <h3>Agenda integrada e novos leads</h3>
              </motion.article>
              <motion.article className="shot" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
                <span>Imobiliaria</span>
                <h3>Catalogo com busca inteligente</h3>
              </motion.article>
              <motion.article className="shot" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
                <span>Marca de moda</span>
                <h3>Visual imersivo e rapido</h3>
              </motion.article>
              <motion.article className="shot" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
                <span>Restaurante</span>
                <h3>Reservas em 2 cliques</h3>
              </motion.article>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section className="impact" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <h2>Sites genericos nao geram impacto. Criamos experiencias autenticas para impulsionar sua empresa.</h2>
          <a className="cta" href="#contato">Quero gerar impacto</a>
        </motion.section>

        <motion.section className="pain-points" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.div className="section-header" variants={fadeUp}>
            <h2>A ausencia de um site ou um site mal projetado vai:</h2>
          </motion.div>
          <motion.div className="cards" variants={stagger}>
            <motion.article className="card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <span className="card-index">01</span>
              <h3>Prejudicar sua credibilidade</h3>
              <p>Clientes em potencial desistem quando nao encontram informacoes confiaveis.</p>
            </motion.article>
            <motion.article className="card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <span className="card-index">02</span>
              <h3>Reduzir sua visibilidade digital</h3>
              <p>Seu negocio perde espaco nos resultados e fica dependente de midia paga.</p>
            </motion.article>
            <motion.article className="card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <span className="card-index">03</span>
              <h3>Afetar suas vendas</h3>
              <p>Sem uma jornada clara, os contatos nao evoluem para compras.</p>
            </motion.article>
          </motion.div>
        </motion.section>

        <motion.section className="value" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.div className="value-content" variants={fadeUp}>
            <h2>Sites rapidos e autenticos que geram resultados reais.</h2>
            <p>Cada projeto e estruturado para fortalecer a sua marca, acelerar conversoes e entregar uma experiencia memoravel.</p>
            <ul>
              <li>Tempo de carregamento abaixo de 3 segundos.</li>
              <li>Design personalizado que aumenta confianca.</li>
              <li>Arquitetura pensada para SEO e crescimento organico.</li>
            </ul>
          </motion.div>
          <motion.div className="value-cards" variants={stagger}>
            <motion.article className="mini-card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>Performance</h3>
              <p>Otimizacao completa para paginas leves e estaveis.</p>
            </motion.article>
            <motion.article className="mini-card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>Design estrategico</h3>
              <p>Layouts que guiam o usuario ate a acao certa.</p>
            </motion.article>
            <motion.article className="mini-card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>SEO e conteudo</h3>
              <p>Organizacao que melhora leitura e rankeamento.</p>
            </motion.article>
          </motion.div>
        </motion.section>

        <motion.section id="servicos" className="services" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.div className="section-header" variants={fadeUp}>
            <h2>Nossos servicos</h2>
            <p>Encontre a melhor solucao digital para sua empresa com prazos claros e processo previsivel.</p>
          </motion.div>
          <motion.div className="cards" variants={stagger}>
            <motion.article className="service-card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>Landing Page</h3>
              <p>Ideal para capturar leads com foco em conversao imediata.</p>
              <ul>
                <li>Layout exclusivo</li>
                <li>CTA estrategico</li>
                <li>SEO basico</li>
              </ul>
              <a className="ghost" href="#contato">Quero gerar impacto</a>
            </motion.article>
            <motion.article className="service-card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>Site Institucional</h3>
              <p>Vitrine completa da sua empresa com paginas informativas.</p>
              <ul>
                <li>Navegacao clara</li>
                <li>Conteudo revisado</li>
                <li>Responsivo total</li>
              </ul>
              <a className="ghost" href="#contato">Quero gerar impacto</a>
            </motion.article>
            <motion.article className="service-card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>Site Dinamico</h3>
              <p>Estrutura flexivel para atualizacoes e conteudos frequentes.</p>
              <ul>
                <li>CMS simplificado</li>
                <li>Blog integrado</li>
                <li>Treinamento incluso</li>
              </ul>
              <a className="ghost" href="#contato">Quero gerar impacto</a>
            </motion.article>
            <motion.article className="service-card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>E-commerce</h3>
              <p>Lojas virtuais prontas para vender mais e escalar.</p>
              <ul>
                <li>Checkout intuitivo</li>
                <li>Integracoes essenciais</li>
                <li>Performance otimizada</li>
              </ul>
              <a className="ghost" href="#contato">Quero gerar impacto</a>
            </motion.article>
          </motion.div>
        </motion.section>

        <motion.section className="clients" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div className="section-header">
            <h2>Clientes atendidos</h2>
          </div>
          <div className="logo-grid">
            <span>Restaurante premium</span>
            <span>Tech logistica</span>
            <span>Saude digital</span>
            <span>Educacao criativa</span>
            <span>Imobiliaria prime</span>
            <span>Fintech B2B</span>
          </div>
        </motion.section>

        <motion.section className="included" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.div className="section-header" variants={fadeUp}>
            <h2>Incluso em todos os projetos</h2>
          </motion.div>
          <motion.div className="cards" variants={stagger}>
            <motion.article className="card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>Dominio e hospedagem</h3>
              <p>Configuramos tudo para voce nao se preocupar.</p>
            </motion.article>
            <motion.article className="card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>Integracoes externas</h3>
              <p>Google Maps, redes sociais e formularios conectados.</p>
            </motion.article>
            <motion.article className="card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>Botao flutuante</h3>
              <p>Contato rapido via Whatsapp sempre visivel.</p>
            </motion.article>
            <motion.article className="card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <h3>Treinamento interno</h3>
              <p>Equipe pronta para atualizar o site com autonomia.</p>
            </motion.article>
          </motion.div>
        </motion.section>

        <motion.section id="sobre" className="about" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.div variants={fadeUp}>
            <h2>Sobre nos</h2>
            <p>Somos um estudio liderado por designers e estrategistas apaixonados por criar marcas digitais fortes. Trabalhamos com atendimento humano, processos claros e comunicacao transparente.</p>
            <a className="ghost" href="#contato">Fazer meu site</a>
          </motion.div>
          <motion.div className="about-panel" variants={fadeUp}>
            <h3>Como trabalhamos</h3>
            <ol>
              <li>Briefing rapido e alinhamento de metas.</li>
              <li>Wireframe e proposta visual.</li>
              <li>Desenvolvimento e testes de performance.</li>
              <li>Treinamento e acompanhamento.</li>
            </ol>
          </motion.div>
        </motion.section>

        <motion.section id="depoimentos" className="testimonials" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.div className="section-header" variants={fadeUp}>
            <h2>Depoimentos</h2>
          </motion.div>
          <motion.div className="cards" variants={stagger}>
            <motion.article className="card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <p>"O processo foi claro e o resultado superou nossas expectativas. A pagina ficou elegante e funcional."</p>
              <strong>Marina V.</strong>
              <span>Clinica Aurora</span>
            </motion.article>
            <motion.article className="card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <p>"Equipe atenciosa, prazo cumprido e site lindo. Nossa conversao aumentou logo no primeiro mes."</p>
              <strong>Thiago R.</strong>
              <span>Studio Horizonte</span>
            </motion.article>
            <motion.article className="card" variants={fadeUp} whileHover={hoverLift} transition={hoverSpring}>
              <p>"Um layout moderno e facil de manter. Recebemos elogios constantes dos clientes."</p>
              <strong>Ana C.</strong>
              <span>Nexdom</span>
            </motion.article>
          </motion.div>
        </motion.section>

        <motion.section id="contato" className="contact" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div className="section-header">
            <h2>Pronto para destacar sua empresa no digital?</h2>
            <p>Fale conosco e comece a criar o site que sua marca merece.</p>
          </div>
          <form className="contact-form">
            <div className="field">
              <label htmlFor="nome">Seu nome</label>
              <input id="nome" name="nome" type="text" placeholder="Seu nome" />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" placeholder="Seu e-mail" />
            </div>
            <div className="field">
              <label htmlFor="telefone">Telefone / Whatsapp</label>
              <input id="telefone" name="telefone" type="tel" placeholder="(00) 00000-0000" />
            </div>
            <div className="field">
              <label htmlFor="investimento">Quanto pretende investir?</label>
              <select id="investimento" name="investimento">
                <option>Selecione</option>
                <option>Ate R$ 2.000</option>
                <option>De R$ 2.000 a R$ 5.000</option>
                <option>De R$ 5.000 a R$ 8.000</option>
                <option>Acima de R$ 8.000</option>
                <option>Ainda nao sei</option>
              </select>
            </div>
            <div className="field">
              <label>Como prefere manter o contato?</label>
              <div className="radio-row">
                <label><input type="radio" name="contato" defaultChecked /> Whatsapp</label>
                <label><input type="radio" name="contato" /> E-mail</label>
              </div>
            </div>
            <div className="field">
              <label htmlFor="mensagem">Conte um pouco sobre o seu projeto</label>
              <textarea id="mensagem" name="mensagem" rows="4" placeholder="Descreva suas necessidades"></textarea>
            </div>
            <button type="submit" className="cta">Enviar</button>
          </form>
        </motion.section>
      </main>

      <motion.footer className="site-footer" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
        <div>
          <a className="brand" href="#inicio">Handone</a>
          <p>All rights reserved to Handone Studio.</p>
        </div>
        <div className="footer-links">
          <a href="#servicos">Servicos</a>
          <a href="#portfolio">Clientes</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </div>
        <div className="footer-social">
          <span>Siga-nos nas redes sociais</span>
          <div className="social-row">
            <span>Instagram</span>
            <span>LinkedIn</span>
            <span>Behance</span>
          </div>
        </div>
      </motion.footer>
    </>
  )
}

export default App
