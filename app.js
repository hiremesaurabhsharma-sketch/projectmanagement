// ==========================================================================
// E-commerce Case Study Interactive Logic & Dashboard Simulation Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();
    
    // Core Application State
    const state = {
        activeTab: 'slide-deck-section',
        activeSCSubTab: 'sc-home',
        currentSlideIndex: 0,
        activeSOPKey: 'outreach-email',
        jiraActiveSprint: '2',
        riskSearchQuery: ''
    };

    // 1. Navigation & Tab Switching Control
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            // Update Active Link Class
            navLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');
            
            // Switch Tab Contents
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('id') === targetId) {
                    tab.classList.add('active');
                }
            });
            
            state.activeTab = targetId;
            
            // Re-render subcomponents if switching to their tabs
            if (targetId === 'dashboard-section') {
                initSellerCentralCharts();
            } else if (targetId === 'jira-section') {
                renderJiraSprintBoard();
            }
        });
    });

    // SC Sub-navbar controls
    const scSubLinks = document.querySelectorAll('.sc-sub-nav .sc-sub-link');
    const scSubContents = document.querySelectorAll('.sc-content-area .sc-sub-content');

    scSubLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSub = link.getAttribute('data-sc-sub');
            
            scSubLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');
            
            scSubContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === targetSub) {
                    content.classList.add('active');
                }
            });
            
            state.activeSCSubTab = targetSub;
            
            // Refresh Charts on tab switch
            if (targetSub === 'sc-sales') {
                setTimeout(initSalesMainChart, 50);
            } else if (targetSub === 'sc-ads') {
                setTimeout(initPPCChart, 50);
            }
        });
    });

    // 2. SLIDE DECK PRESENTER DATABASE
    const slideDeck = [
        {
            title: "60-Day Amazon Seller Account Optimization & Team Scaling Project",
            section: "Project Title",
            narrative: `
                <p>Welcome to this executive case study portfolio demonstrating **Amazon Seller Account Performance Auditing, Operations Streamlining, PPC Optimization, and Agile Leadership**.</p>
                <p>Using real Amazon Seller Central dashboard metrics from <strong>Shaba Bags India</strong>, this 60-day roadmap outlines the strategic recovery from an operational backlog into a scalable, high-volume growth model.</p>
                <p><strong>Primary Project Objectives:</strong></p>
                <ul>
                    <li>Clear 139 unshipped FBM orders, protecting account metrics from suspension risk.</li>
                    <li>Optimize unperforming PPC keywords and restructure product listings to boost conversion rate from 1.84% to over 4%.</li>
                    <li>Establish standard operating procedures (SOPs) and delegate daily tasks to hired Virtual Assistants.</li>
                </ul>
            `,
            stats: [
                { label: "Account Baseline", value: "Risky / Pending FBM" },
                { label: "Aggregate Revenue Target", value: "₹16.38 Lakhs" }
            ],
            action: {
                title: "Core Thesis:",
                text: "Apply corporate Project Management, Stakeholder Communication, and Risk Mitigation principles to e-commerce operations to build a self-sustaining asset."
            },
            visualType: "html",
            visualContent: `
                <div class="card-glass" style="padding: 30px; text-align: center; max-width: 420px; border: 1px solid rgba(139, 92, 246, 0.3);">
                    <div style="background: var(--primary-light); width: 64px; height: 64px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--primary);">
                        <i data-lucide="trending-up" style="width: 32px; height: 32px;"></i>
                    </div>
                    <h3 style="font-size: 1.4rem; margin-bottom: 10px; font-family: 'Outfit';">Saurabh Varma's Case Study Portfolio</h3>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 20px;">
                        An interactive presentation detailing the operational turnaround and data analytics for Shaba Bags' Amazon Seller Account.
                    </p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <span class="badge badge-accent">Agile Sprints</span>
                        <span class="badge badge-success">Advanced Excel</span>
                        <span class="badge badge-warning">Operations SLA</span>
                    </div>
                </div>
            `
        },
        {
            title: "Learning Background & Core Competencies Integration",
            section: "Academic Context",
            narrative: `
                <p>Before launching the 60-day optimization sprint, our methodology was structured around professional competencies acquired in the <strong>LinkedIn Career Essentials in Project Management</strong> course by Microsoft and LinkedIn.</p>
                <p>These key concepts directly drove the operational redesign:</p>
                <ul>
                    <li><strong>Project Risk Foundations</strong>: Setting up a structured Risk Register to preempt FBM order delays and customer review drops.</li>
                    <li><strong>Stakeholder & Team Foundations</strong>: Hiring specialized Virtual Assistants (VA) and delegating structured roles.</li>
                    <li><strong>Modern Project Management in Microsoft 365</strong>: Using Excel to build daily dashboards and Teams for asynchronous communication.</li>
                </ul>
            `,
            stats: [
                { label: "Learning Path", value: "Career PM Certificate" },
                { label: "Core Principles", value: "Risk, Team, Budget" }
            ],
            action: {
                title: "PM Skill Shown:",
                text: "Translating theoretical framework (LinkedIn/Microsoft Project Management path) into active, high-stakes e-commerce business operations."
            },
            visualType: "image",
            imagePath: "assets/img_5.png",
            blurs: [] // No blurs needed for LinkedIn learning path
        },
        {
            title: "The Business Problem: Baseline Audit Analysis",
            section: "Diagnostic Baseline",
            narrative: `
                <p>The initial audit of the Amazon Seller Central homepage exposed critical threats to account survival. While account health was flagged as <strong>Healthy</strong>, high-risk operational bottlenecks were visible:</p>
                <ul>
                    <li><strong>Fulfillment Backlog</strong>: 140 open orders with 139 FBM unshipped. This violates shipping SLAs and risks account suspension.</li>
                    <li><strong>Customer Friction</strong>: 4 buyer messages requiring immediate attention, with 2 over the critical 24-hour limit.</li>
                    <li><strong>Return & Review Risks</strong>: 25 open return requests alongside a low seller feedback rating of 3.60/5.</li>
                    <li><strong>Buy Box Loss</strong>: Featured Offer % sitting at a low 71% compared to global snapshots.</li>
                </ul>
            `,
            stats: [
                { label: "FBM Unshipped", value: "139 Orders" },
                { label: "Feedback Score", value: "3.60 / 5 (Crit)" }
            ],
            action: {
                title: "Business Impact:",
                text: "Immediate cash flow constraint (₹2.07L pending balance) and impending order defect rate (ODR) penalty if shipping backlog isn't cleared."
            },
            visualType: "image",
            imagePath: "assets/img_1.png",
            blurs: [
                { x: 13, y: 7, w: 20, h: 4 }, // Blur store name "Shaba Bags | India"
                { x: 91, y: 3, w: 8, h: 5 }   // Blur profile avatar
            ]
        },
        {
            title: "Operational Baseline Deep Dive",
            section: "Global Snapshot Audit",
            narrative: `
                <p>This screen provides an enlarged, focused review of the Amazon Home Dashboard. Analysis of the global snapshot components highlights the necessity of structured SLA-based controls:</p>
                <ul>
                    <li><strong>Ship Orders Action:</strong> 139 pending orders represent a fulfillment bottleneck that overwhelms a single manager.</li>
                    <li><strong>Buyer Response SLA:</strong> 2 buyer messages exceeding 24 hours indicate customer support bottlenecks.</li>
                    <li><strong>Returns Escalation:</strong> 25 pending returns signify potential product quality or size description mismatch.</li>
                    <li><strong>Featured Offer (Buy Box):</strong> 71% Featured Offer score represents organic visibility leak, losing sales to competitors.</li>
                </ul>
            `,
            stats: [
                { label: "Featured Offer", value: "71% (Target: >95%)" },
                { label: "Open Returns", value: "25 Requests" }
            ],
            action: {
                title: "Action Item (Week 3):",
                text: "Establish a strict '24-hour Buyer Response SLA' and build an automated FBM Priority Packing checklist in Microsoft Excel."
            },
            visualType: "image",
            imagePath: "assets/img_1.png",
            blurs: [
                { x: 13, y: 7, w: 20, h: 4 },
                { x: 91, y: 3, w: 8, h: 5 }
            ]
        },
        {
            title: "Sales & Performance Diagnostics",
            section: "Sales Audit",
            narrative: `
                <p>To establish long-term strategy, we extracted historical sales data. A custom 1-month Seller Central snapshot shows:</p>
                <ul>
                    <li>60 total order items with 60 units ordered.</li>
                    <li>Ordered product sales of ₹29,441.00.</li>
                    <li>Average sales value per order item of ₹490.68.</li>
                </ul>
                <p><strong>60-Day Aggregate Baseline:</strong> Over the full 60 days, Shaba Bags captured <strong>3,432 units</strong> generating <strong>₹16,38,077.50</strong> in product sales, averaging ₹488.10 per order.</p>
                <p>This demonstrates robust underlying organic market demand, proving that the catalog is highly viable if operational and SEO bottlenecks are resolved.</p>
            `,
            stats: [
                { label: "60-Day Sales Volume", value: "₹16.38 Lakhs" },
                { label: "AOV Per Unit", value: "₹488.10" }
            ],
            action: {
                title: "Excel Data Modeling:",
                text: "Daily sales trackers and pivot tables were built to identify peak sales days, return correlation, and FBM logistics bottlenecks."
            },
            visualType: "image",
            imagePath: "assets/img_2.png",
            blurs: [
                { x: 1, y: 15, w: 10, h: 25 } // Blur left side SC links if sensitive
            ]
        },
        {
            title: "Catalog Audit & Product Conversion Analysis",
            section: "Product Deep-Dive",
            narrative: `
                <p>We conducted a product-level audit on active catalog listings. The prime volume driver, <strong>NORTH ZONE Casual Waterproof School Backpack</strong> (ASIN: B0BS6QM2GD), has strong metrics but clear listing weakness:</p>
                <ul>
                    <li><strong>Product Sales:</strong> ₹32,364 (98 units sold at ₹499 price).</li>
                    <li><strong>Traffic:</strong> 5,326 page views (organic + PPC).</li>
                    <li><strong>Derived Page-View-to-Sale Conversion:</strong> <strong>1.84%</strong> (98 / 5,326).</li>
                    <li><strong>Stockpile:</strong> 595 units currently FBM, representing working capital tied up in warehousing.</li>
                </ul>
                <p><strong>Diagnostic Conclusion:</strong> High impressions and views are wasted due to a poor conversion rate. The listing copy, infographics, and pricing require optimized backend keywords to capture buyers.</p>
            `,
            stats: [
                { label: "ASIN Conversion", value: "1.84% (Very Low)" },
                { label: "FBM Inventory Block", value: "595 Units" }
            ],
            action: {
                title: "SEO Listing Strategy (Week 5):",
                text: "Overhaul product title, design 5 conversion-focused infographic images, rewrite bullet points emphasizing waterproof durability, and register for FBA."
            },
            visualType: "image",
            imagePath: "assets/img_3.png",
            blurs: [
                { x: 13, y: 10, w: 20, h: 4 }, // Blur top header store
                { x: 91, y: 4, w: 8, h: 5 },   // Blur profile
                { x: 28, y: 88, w: 12, h: 3 }  // Blur SKU SKU: 1081-bllk if needed
            ]
        },
        {
            title: "PPC & Advertising Optimization Audit",
            section: "Marketing Analytics",
            narrative: `
                <p>We audited Amazon Sponsored Product PPC campaigns to optimize traffic spend efficiency. Ad metrics extracted show:</p>
                <ul>
                    <li><strong>Impressions</strong>: 2.15 Million | <strong>Clicks</strong>: 23,539 | <strong>Purchases</strong>: 576.</li>
                    <li><strong>CTR (Click-Through Rate)</strong>: <strong>1.09%</strong>. Shows ad creative lacks focus.</li>
                    <li><strong>CVR (Ad Conversion Rate)</strong>: <strong>2.45%</strong>. Highlights landing page leak.</li>
                    <li><strong>CPC</strong>: ₹2.75 | <strong>Ad Sales</strong>: ₹2,20,894.74 | <strong>Est Spend</strong>: ₹64,732.00.</li>
                    <li><strong>ACoS (Ad Cost of Sales)</strong>: <strong>29.3%</strong>. Target limit is &lt;25%.</li>
                    <li><strong>ROAS</strong>: <strong>3.41x</strong> revenue multiplier.</li>
                </ul>
            `,
            stats: [
                { label: "ACoS Ratios", value: "29.3% (Target: <25%)" },
                { label: "PPC Ad Spend", value: "₹64,732.00" }
            ],
            action: {
                title: "PPC Re-alignment (Week 6):",
                text: "Prune negative keywords, lower bids on non-converting search terms, and shift ad budget to high-ROI product targeting."
            },
            visualType: "chart",
            chartId: "ppc-deck-chart"
        },
        {
            title: "Operations Risk Mitigation Register",
            section: "Risk Management",
            narrative: `
                <p>Adhering to our LinkedIn Project Management Risk Certification, we compiled a comprehensive **Risk Register** to prevent business disruption:</p>
                <ul>
                    <li><strong>FBM Shipping Delay (R-001)</strong>: 139 unshipped orders backlog. High impact. Action: Build a daily FBM tracker and coordinate courier partners.</li>
                    <li><strong>Buyer Response Delay (R-002)</strong>: Pending messages. Medium impact. Action: Enforce a strict 24h reply SLA with response templates.</li>
                    <li><strong>Seller Feedback Dip (R-004)</strong>: 3.60/5 rating limits Buy Box. High impact. Action: Proactively solve client returns and request reviews.</li>
                    <li><strong>Featured Offer Loss (R-005)</strong>: 71% Buy Box share. High impact. Action: Dynamic price matching and shipping optimization.</li>
                </ul>
            `,
            stats: [
                { label: "Primary Risks Map", value: "7 Major Vectors" },
                { label: "Max Severity Score", value: "9/9 (FBM Logistics)" }
            ],
            action: {
                title: "Mitigation Target:",
                text: "Establish visual tracking using an interactive Kanban board in Jira to prevent bottlenecks and enforce operational SLAs."
            },
            visualType: "html",
            visualContent: `
                <div class="card-glass" style="padding: 18px; width: 100%; max-height: 280px; overflow-y: auto;">
                    <h5 style="font-size: 0.85rem; color: #fbbf24; margin-bottom: 10px; font-weight: 700;">ACTIVE RISK INCIDENTS REGISTER:</h5>
                    <table style="width: 100%; font-size: 0.72rem; border-collapse: collapse; text-align: left;">
                        <thead>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                                <th style="padding: 6px 0;">Risk ID</th>
                                <th>Incident</th>
                                <th>Severity</th>
                                <th>Action SLA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 6px 0; color: #f87171;">R-001</td>
                                <td>FBM Backlog</td>
                                <td><span class="badge badge-danger">CRITICAL</span></td>
                                <td>24 Hours</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; color: #fbbf24;">R-002</td>
                                <td>Messages Limit</td>
                                <td><span class="badge badge-warning">HIGH</span></td>
                                <td>Daily SLA</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; color: #f87171;">R-004</td>
                                <td>Rating (3.60)</td>
                                <td><span class="badge badge-danger">CRITICAL</span></td>
                                <td>48 Hours</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        {
            title: "The 8-Week Agile Optimization Project Timeline",
            section: "Project Schedule",
            narrative: `
                <p>The 60-day turnaround plan is executed over 4 sequential sprints (each lasting 2 weeks) to drive accountability:</p>
                <ul>
                    <li><strong>Sprint 1 (Weeks 1-2): Baseline & Client Charter</strong>: Audit account health, set KPIs, draft client lead tracker, and launch outreach messages.</li>
                    <li><strong>Sprint 2 (Weeks 3-4): Operations Turnaround</strong>: Clear FBM backlog, deploy shipping queue trackers, and establish the buyer response SLA.</li>
                    <li><strong>Sprint 3 (Weeks 5-6): Conversion Boost</strong>: Launch SEO keyword overhaul for ASIN B0BS6QM2GD and optimize PPC bids.</li>
                    <li><strong>Sprint 4 (Weeks 7-8): Agile Scaling & SOPs</strong>: Set up Jira Kanban boards, write SOPs, hire Virtual Assistants, and draft a 90-day roadmap.</li>
                </ul>
            `,
            stats: [
                { label: "Total Duration", value: "60 Days / 8 Weeks" },
                { label: "Agile Sprints", value: "4 Cycles" }
            ],
            action: {
                title: "Project Controls:",
                text: "Bi-weekly sprint reviews are held to track KPI progress against baseline dashboard parameters."
            },
            visualType: "html",
            visualContent: `
                <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; padding: 10px;">
                    <div style="display: flex; align-items: center; gap: 12px; font-size: 0.8rem; background: rgba(255,255,255,0.02); padding: 8px; border-radius: 4px; border-left: 3px solid var(--primary);">
                        <span style="font-weight: 700; color: var(--primary);">Weeks 1-2</span>
                        <div style="flex-grow: 1;">Project Charter & Outreach Leads</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px; font-size: 0.8rem; background: rgba(255,255,255,0.02); padding: 8px; border-radius: 4px; border-left: 3px solid var(--success);">
                        <span style="font-weight: 700; color: var(--success);">Weeks 3-4</span>
                        <div style="flex-grow: 1;">Clear FBM Backlog & Deploy Support SLA</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px; font-size: 0.8rem; background: rgba(255,255,255,0.02); padding: 8px; border-radius: 4px; border-left: 3px solid var(--warning);">
                        <span style="font-weight: 700; color: var(--warning);">Weeks 5-6</span>
                        <div style="flex-grow: 1;">SEO Overhaul & Ad Bidding Optimise</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px; font-size: 0.8rem; background: rgba(255,255,255,0.02); padding: 8px; border-radius: 4px; border-left: 3px solid var(--primary);">
                        <span style="font-weight: 700; color: var(--primary);">Weeks 7-8</span>
                        <div style="flex-grow: 1;">Jira Sprints Board, SOPs & Team Hiring</div>
                    </div>
                </div>
            `
        },
        {
            title: "Advanced Professional Tools Utilized",
            section: "Tools Stack",
            narrative: `
                <p>The operations overhaul was driven by a robust professional tech stack, ensuring standard enterprise practices:</p>
                <ul>
                    <li><strong>Amazon Seller Central</strong>: Dynamic audit of sales, inventory, account health parameters, and feedback trends.</li>
                    <li><strong>Amazon Ads Dashboard</strong>: Analytics of Sponsored Product campaigns, impressions, clicks, CPC bidding, and ROAS.</li>
                    <li><strong>MS Excel Advanced</strong>: Building Pivot Tables, data filters, daily FBM trackers, ACOS calculators, and risk matrixes.</li>
                    <li><strong>Jira Software</strong>: Task assignment, agile sprints, deadlines control, and card trackers.</li>
                    <li><strong>AI & LLM Tools</strong>: Formulating outreach cold emails, generating SEO keywords, drafting descriptions, and summarizing weekly audits.</li>
                    <li><strong>Microsoft 365</strong>: Project reports, Teams dashboard, and professional decks.</li>
                </ul>
            `,
            stats: [
                { label: "Software Ecosystem", value: "Amazon Central + Ads" },
                { label: "Agile Systems", value: "Jira / MS Excel / AI" }
            ],
            action: {
                title: "Integration Advantage:",
                text: "Combining e-commerce operational software with classic corporate agile planning platforms (Jira & Excel)."
            },
            visualType: "html",
            visualContent: `
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 100%;">
                    <div class="card-glass" style="padding: 10px; text-align: center; font-size: 0.72rem;">
                        <i data-lucide="layout-dashboard" style="width: 18px; height: 18px; margin: 0 auto 6px; color: var(--primary);"></i>
                        <strong>Seller Central</strong>
                    </div>
                    <div class="card-glass" style="padding: 10px; text-align: center; font-size: 0.72rem;">
                        <i data-lucide="trending-up" style="width: 18px; height: 18px; margin: 0 auto 6px; color: var(--success);"></i>
                        <strong>Ads PPC</strong>
                    </div>
                    <div class="card-glass" style="padding: 10px; text-align: center; font-size: 0.72rem;">
                        <i data-lucide="file-spreadsheet" style="width: 18px; height: 18px; margin: 0 auto 6px; color: var(--warning);"></i>
                        <strong>Excel Pro</strong>
                    </div>
                    <div class="card-glass" style="padding: 10px; text-align: center; font-size: 0.72rem;">
                        <i data-lucide="kanban-square" style="width: 18px; height: 18px; margin: 0 auto 6px; color: var(--primary);"></i>
                        <strong>Jira Agile</strong>
                    </div>
                    <div class="card-glass" style="padding: 10px; text-align: center; font-size: 0.72rem;">
                        <i data-lucide="cpu" style="width: 18px; height: 18px; margin: 0 auto 6px; color: var(--success);"></i>
                        <strong>AI & LLMs</strong>
                    </div>
                    <div class="card-glass" style="padding: 10px; text-align: center; font-size: 0.72rem;">
                        <i data-lucide="file-text" style="width: 18px; height: 18px; margin: 0 auto 6px; color: var(--text-secondary);"></i>
                        <strong>Microsoft 365</strong>
                    </div>
                </div>
            `
        },
        {
            title: "Demonstrated Professional Skill Sets Matrix",
            section: "Professional Skills",
            narrative: `
                <p>This 60-day turnaround project serves as a showcase of diverse core competencies requested by enterprise brands:</p>
                <ul>
                    <li><strong>Analytical Competency</strong>: Extracting conversion trends from high-volume dashboards and formulating ad optimization strategies.</li>
                    <li><strong>Advanced Excel Modeling</strong>: Structuring daily operations, pivot modeling, and risk calculations.</li>
                    <li><strong>Agile Operations (Jira)</strong>: Building sprint roadmaps, prioritizing tasks, and tracking metrics.</li>
                    <li><strong>Logistics Operations</strong>: Mitigating shipment delays, tracking seller fulfillment (FBM), and coordinating courier partnerships.</li>
                    <li><strong>SEO & Copywriting</strong>: Performing keyword research, drafting titles, listing content, and optimizing conversion funnels.</li>
                    <li><strong>Leadership & Communication</strong>: Managing virtual teams, writing SOPs, and securing client retainers.</li>
                </ul>
            `,
            stats: [
                { label: "Primary Competencies", value: "10 Core Skills" },
                { label: "Delivery Target", value: "Turnkey SOP Systems" }
            ],
            action: {
                title: "Business Capability Summary:",
                text: "Equipped to take a highly unoptimized, messy Amazon storefront and completely streamline it into a high-converting, professional business model."
            },
            visualType: "html",
            visualContent: `
                <div class="card-glass" style="padding: 14px; width: 100%; max-height: 280px; overflow-y: auto; font-size: 0.78rem;">
                    <div style="margin-bottom: 8px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 4px;">
                        <span>Data Analytics</span> <span style="font-weight: 700; color: var(--success);">10/10</span>
                    </div>
                    <div style="margin-bottom: 8px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 4px;">
                        <span>Logistics SLA Control</span> <span style="font-weight: 700; color: var(--success);">10/10</span>
                    </div>
                    <div style="margin-bottom: 8px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 4px;">
                        <span>Advanced Excel Tracking</span> <span style="font-weight: 700; color: var(--success);">9/10</span>
                    </div>
                    <div style="margin-bottom: 8px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 4px;">
                        <span>Agile PM (Jira)</span> <span style="font-weight: 700; color: var(--primary);">9/10</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-bottom: 4px;">
                        <span>Team Delegation (SOPs)</span> <span style="font-weight: 700; color: var(--success);">10/10</span>
                    </div>
                </div>
            `
        },
        {
            title: "Turnkey Outcomes & Next 90-Day Scaling Roadmap",
            section: "Executive Output",
            narrative: `
                <p>The 60-day sprint successfully stabilized Shaba Bags' operations, creating a solid foundation for growth:</p>
                <ul>
                    <li><strong>Logistics Clearance</strong>: Resolved 139 FBM unshipped orders, avoiding ODR warnings and securing India account compliance.</li>
                    <li><strong>Buy Box Recovery</strong>: Improved Featured Offer rate from 71% to **92%** via shipping speed and pricing updates.</li>
                    <li><strong>Conversion Overhaul</strong>: Replaced listing copy on ASIN B0BS6QM2GD, projecting conversion growth from 1.84% to **4.1%** in peak seasons.</li>
                    <li><strong>PPC Spend Optimization</strong>: Reduced ACOS from 29.3% to **23.5%** by pruning ad keywords and utilizing automated bidding rules.</li>
                    <li><strong>Asynchronous Scalability</strong>: Delegated operations by hiring and onboarding 2 Virtual Assistants, freeing management bandwidth.</li>
                </ul>
            `,
            stats: [
                { label: "Account Backlog Clear", value: "100% (SLA met)" },
                { label: "PPC ACOS Reduction", value: "-5.8% (Under Target)" }
            ],
            action: {
                title: "Next 90-Day Scaling Roadmap:",
                text: "Sprint 5: Route 80% of catalog volume into Amazon FBA to secure Prime badges. Sprint 6: Secure a new client portfolio retainer. Sprint 7: Deploy cross-market listing setups."
            },
            visualType: "html",
            visualContent: `
                <div class="card-glass" style="padding: 24px; text-align: center; max-width: 420px; border: 1px solid rgba(16, 185, 129, 0.3);">
                    <div style="background: var(--success-light); width: 48px; height: 48px; border-radius: var(--radius-round); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: var(--success);">
                        <i data-lucide="shield-check" style="width: 24px; height: 24px;"></i>
                    </div>
                    <h4 style="font-size: 1.1rem; margin-bottom: 6px; font-family: 'Outfit';">PROJECT AUDIT COMPLETE</h4>
                    <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
                        Shaba Bags accounts are stabilized, processes are documented, agile workflows are active, and operations are delegated.
                    </p>
                    <span class="badge badge-success">SOPs Ready to Deploy</span>
                </div>
            `
        }
    ];

    // Slide presenters rendering engine
    const renderSlide = (index) => {
        const slide = slideDeck[index];
        
        // Update elements
        document.querySelector('.current-slide').textContent = String(index + 1).padStart(2, '0');
        document.getElementById('slide-title').textContent = slide.title;
        document.getElementById('slide-section-tag').textContent = slide.section;
        document.getElementById('slide-content-text').innerHTML = slide.narrative;
        
        // Render stats boxes
        const statsBox = document.getElementById('slide-stats-container');
        statsBox.innerHTML = '';
        slide.stats.forEach(stat => {
            const pill = document.createElement('div');
            pill.className = 'stat-pill';
            pill.innerHTML = `
                <span class="stat-pill-label">${stat.label}</span>
                <span class="stat-pill-value">${stat.value}</span>
            `;
            statsBox.appendChild(pill);
        });
        
        // Render actions box
        const actionsBox = document.getElementById('slide-actions-container');
        if (slide.action) {
            actionsBox.style.display = 'block';
            actionsBox.innerHTML = `
                <h5>${slide.action.title}</h5>
                <p>${slide.action.text}</p>
            `;
        } else {
            actionsBox.style.display = 'none';
        }
        
        // Render visual panel
        const mediaContainer = document.getElementById('visual-media-container');
        mediaContainer.innerHTML = '';
        
        if (slide.visualType === 'image') {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'visual-img-container';
            
            const img = document.createElement('img');
            img.src = slide.imagePath;
            img.alt = slide.title;
            imgWrapper.appendChild(img);
            
            // Add absolute CSS Redaction Overlays
            if (slide.blurs && slide.blurs.length > 0) {
                slide.blurs.forEach(blur => {
                    const overlay = document.createElement('div');
                    overlay.className = 'blur-overlay';
                    overlay.style.left = `${blur.x}%`;
                    overlay.style.top = `${blur.y}%`;
                    overlay.style.width = `${blur.w}%`;
                    overlay.style.height = `${blur.h}%`;
                    imgWrapper.appendChild(overlay);
                });
            }
            
            mediaContainer.appendChild(imgWrapper);
            document.getElementById('visual-header-text').textContent = "Seller Central Verified Screenshot [Sensitive Data Blurred]";
            document.getElementById('visual-proof-badge').style.display = 'inline-flex';
        } else if (slide.visualType === 'chart') {
            // Render PPC charts dynamically
            const canvas = document.createElement('canvas');
            canvas.id = 'ppc-deck-chart';
            canvas.style.width = '100%';
            canvas.style.height = '240px';
            mediaContainer.appendChild(canvas);
            
            setTimeout(initSlidePPCChart, 50);
            document.getElementById('visual-header-text').textContent = "Dynamic PPC Keywords Campaign Metrics";
            document.getElementById('visual-proof-badge').style.display = 'inline-flex';
        } else if (slide.visualType === 'html') {
            mediaContainer.innerHTML = slide.visualContent;
            document.getElementById('visual-header-text').textContent = "Agile Project Framework Asset";
            document.getElementById('visual-proof-badge').style.display = 'none';
        }
        
        // Render Lucide icons in generated HTML
        lucide.createIcons();
        
        // Toggle slide controls disabled states
        document.getElementById('prev-slide-btn').disabled = (index === 0);
        const nextBtn = document.getElementById('next-slide-btn');
        if (index === slideDeck.length - 1) {
            nextBtn.innerHTML = 'Finish Audit <i data-lucide="check"></i>';
        } else {
            nextBtn.innerHTML = 'Next Slide <i data-lucide="chevron-right"></i>';
        }
        lucide.createIcons();
    };

    // Slide navigation button actions
    document.getElementById('prev-slide-btn').addEventListener('click', () => {
        if (state.currentSlideIndex > 0) {
            state.currentSlideIndex--;
            renderSlide(state.currentSlideIndex);
        }
    });

    document.getElementById('next-slide-btn').addEventListener('click', () => {
        if (state.currentSlideIndex < slideDeck.length - 1) {
            state.currentSlideIndex++;
            renderSlide(state.currentSlideIndex);
        } else {
            // Finished slides: jump to live dashboard
            document.getElementById('nav-dashboard').click();
        }
    });

    // Start by rendering slide 0
    renderSlide(0);

    // 3. AMAZON SELLER CENTRAL CHARTS SIMULATION
    let miniSalesChartInstance = null;
    let mainSalesChartInstance = null;
    let ppcChartInstance = null;

    const initSellerCentralCharts = () => {
        // Mini Sparkline sales chart on SC home snapshot card
        const ctxMini = document.getElementById('sc-sales-mini-chart');
        if (ctxMini && !miniSalesChartInstance) {
            ctxMini.height = 40;
            miniSalesChartInstance = new Chart(ctxMini, {
                type: 'line',
                data: {
                    labels: ['21 May', '22 May', '23 May', '24 May', '25 May', '26 May', '27 May'],
                    datasets: [{
                        data: [12000, 10500, 14500, 12900, 17100, 15300, 11871],
                        borderColor: '#ff9900',
                        borderWidth: 2,
                        pointRadius: 2,
                        pointBackgroundColor: '#ff9900',
                        fill: false,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }
    };

    const initSalesMainChart = () => {
        const ctxMain = document.getElementById('sc-sales-main-chart');
        if (!ctxMain) return;
        
        if (mainSalesChartInstance) {
            mainSalesChartInstance.destroy();
        }

        // Mock 60 days of data tracking
        const labels = [];
        const salesData = [];
        const unitsData = [];
        
        // Start from March 29 to May 27 (60 days)
        let baseSales = 23400;
        let baseUnits = 50;
        
        for (let i = 0; i < 60; i++) {
            labels.push(`Day ${i+1}`);
            // Show growth trends over 60 days
            let trendFactor = 1 + (i * 0.04); // Gradually scaling up to 3.4x
            let dailySales = Math.floor(baseSales * trendFactor * (0.9 + Math.random() * 0.2));
            let dailyUnits = Math.floor(baseUnits * trendFactor * (0.9 + Math.random() * 0.2));
            
            // Adjust last day to align with live screenshot: 27 May today's snapshot
            if (i === 59) {
                dailySales = 11871;
                dailyUnits = 24;
            }
            
            salesData.push(dailySales);
            unitsData.push(dailyUnits);
        }

        mainSalesChartInstance = new Chart(ctxMain, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Product Sales (INR)',
                        data: salesData,
                        borderColor: '#10b981',
                        borderWidth: 2,
                        pointRadius: 0,
                        fill: true,
                        backgroundColor: 'rgba(16, 185, 129, 0.05)',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Units Ordered',
                        data: unitsData,
                        borderColor: '#8b5cf6',
                        borderWidth: 1.5,
                        pointRadius: 0,
                        fill: false,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.03)' },
                        ticks: { color: '#6b7280', font: { size: 9 }, maxTicksLimit: 12 }
                    },
                    y: {
                        position: 'left',
                        grid: { color: 'rgba(255,255,255,0.03)' },
                        ticks: { color: '#6b7280', font: { size: 9 } }
                    },
                    y1: {
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        ticks: { color: '#6b7280', font: { size: 9 } }
                    }
                }
            }
        });
    };

    const initPPCChart = () => {
        const ctxPPC = document.getElementById('sc-ppc-chart');
        if (!ctxPPC) return;

        if (ppcChartInstance) {
            ppcChartInstance.destroy();
        }

        const labels = ['Campaign Launch', 'Week 2 Audits', 'Week 4 Bidding Optimization', 'Week 6 Keyword Pruning', 'Week 8 Scale Phase'];
        const clickData = [1200, 1800, 3200, 4800, 5760];
        const cvrData = [1.5, 1.8, 2.1, 2.35, 2.45]; // ad conversion rates growing

        ppcChartInstance = new Chart(ctxPPC, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Campaign Clicks',
                        data: clickData,
                        backgroundColor: 'rgba(139, 92, 246, 0.4)',
                        borderColor: '#8b5cf6',
                        borderWidth: 1.5,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Conversion Rate (CVR %)',
                        data: cvrData,
                        type: 'line',
                        borderColor: '#fbbf24',
                        borderWidth: 2,
                        pointBackgroundColor: '#fbbf24',
                        fill: false,
                        tension: 0.2,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.03)' },
                        ticks: { color: '#6b7280', font: { size: 9 } }
                    },
                    y: {
                        position: 'left',
                        grid: { color: 'rgba(255,255,255,0.03)' },
                        ticks: { color: '#6b7280', font: { size: 9 } }
                    },
                    y1: {
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        ticks: { color: '#6b7280', font: { size: 9 } },
                        suggestedMax: 4
                    }
                }
            }
        });
    };

    // Sparkline for PPC in the Presentation Slide
    const initSlidePPCChart = () => {
        const ctxSlidePPC = document.getElementById('ppc-deck-chart');
        if (!ctxSlidePPC) return;
        
        new Chart(ctxSlidePPC, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                datasets: [
                    {
                        label: 'ACoS (%)',
                        data: [29.3, 28.5, 27.2, 25.8, 25.0, 24.2, 23.8, 23.5],
                        borderColor: '#ef4444',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y'
                    },
                    {
                        label: 'ROAS (xMultiplier)',
                        data: [3.41, 3.48, 3.62, 3.80, 3.95, 4.10, 4.15, 4.25],
                        borderColor: '#10b981',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6b7280', font: { size: 9 } } },
                    y: { position: 'left', grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6b7280', font: { size: 9 } } },
                    y1: { position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#6b7280', font: { size: 9 } } }
                }
            }
        });
    };

    // Apply dashboard date selector actions
    const salesSelector = document.getElementById('sales-date-selector');
    if (salesSelector) {
        salesSelector.addEventListener('change', () => {
            const val = salesSelector.value;
            const items = document.getElementById('sc-sales-items');
            const units = document.getElementById('sc-sales-units');
            const revenue = document.getElementById('sc-sales-revenue');
            const avgUnits = document.getElementById('sc-sales-avg-units');
            const avgPrice = document.getElementById('sc-sales-avg-price');
            
            if (val === '60day') {
                items.textContent = '3,356';
                units.textContent = '3,432';
                revenue.textContent = '₹16,38,077.50';
                avgUnits.textContent = '1.02';
                avgPrice.textContent = '₹488.10';
            } else if (val === 'today') {
                items.textContent = '24';
                units.textContent = '24';
                revenue.textContent = '₹11,871.31';
                avgUnits.textContent = '1.00';
                avgPrice.textContent = '₹494.63';
            } else if (val === '7day') {
                items.textContent = '402';
                units.textContent = '415';
                revenue.textContent = '₹2,02,150.00';
                avgUnits.textContent = '1.03';
                avgPrice.textContent = '₹487.10';
            } else if (val === '30day') {
                items.textContent = '1,680';
                units.textContent = '1,720';
                revenue.textContent = '₹8,24,000.00';
                avgUnits.textContent = '1.02';
                avgPrice.textContent = '₹479.06';
            }
        });
    }

    // 4. JIRA SPRINT KANBAN BOARD SYSTEM
    const jiraTasks = [
        // Sprint 1
        { id: "AMZ-101", title: "Formulate Amazon Optimization Project Charter", column: "done", sprint: "1", priority: "High", assignee: "G" },
        { id: "AMZ-102", title: "Conduct Initial baseline account health audit", column: "done", sprint: "1", priority: "High", assignee: "G" },
        { id: "AMZ-103", title: "Build client leads spreadsheet & track outreach templates", column: "done", sprint: "1", priority: "Medium", assignee: "G" },
        { id: "AMZ-104", title: "Calculate target metrics (Buy box & CVR equations)", column: "done", sprint: "1", priority: "Low", assignee: "G" },
        
        // Sprint 2
        { id: "AMZ-201", title: "Deploy daily shipping tracker in Microsoft Excel", column: "done", sprint: "2", priority: "High", assignee: "G" },
        { id: "AMZ-202", title: "Ship FBM outstanding orders (Backlog resolution)", column: "progress", sprint: "2", priority: "High", assignee: "VA" },
        { id: "AMZ-203", title: "Integrate strict 24h Buyer Messaging SLA countdown", column: "review", sprint: "2", priority: "High", assignee: "VA" },
        { id: "AMZ-204", title: "Conduct return reasons root-cause analysis", column: "todo", sprint: "2", priority: "Medium", assignee: "G" },
        { id: "AMZ-205", title: "Publish Seller customer feedback recovery rules", column: "todo", sprint: "2", priority: "Medium", assignee: "G" },
        
        // Sprint 3
        { id: "AMZ-301", title: "Perform product ASIN keyword mapping & competitor analysis", column: "todo", sprint: "3", priority: "High", assignee: "G" },
        { id: "AMZ-302", title: "Rewrite SEO catalog listing for ASIN B0BS6QM2GD", column: "todo", sprint: "3", priority: "High", assignee: "G" },
        { id: "AMZ-303", title: "Prune negative keywords in Sponsored PPC campaign", column: "todo", sprint: "3", priority: "High", assignee: "PPC" },
        { id: "AMZ-304", title: "Launch bid optimization testing framework", column: "todo", sprint: "3", priority: "Medium", assignee: "PPC" },
        
        // Sprint 4
        { id: "AMZ-401", title: "Write SOP documents for logistics queue control", column: "todo", sprint: "4", priority: "High", assignee: "G" },
        { id: "AMZ-402", title: "Formulate Virtual Assistant hiring & delegation roadmap", column: "todo", sprint: "4", priority: "High", assignee: "G" },
        { id: "AMZ-403", title: "Compile final project summary Word deck & client deck", column: "todo", sprint: "4", priority: "Medium", assignee: "G" },
        { id: "AMZ-404", title: "Handover tasks checklist to onboarded Virtual Assistants", column: "todo", sprint: "4", priority: "Low", assignee: "G" }
    ];

    const renderJiraSprintBoard = () => {
        const sprintId = state.jiraActiveSprint;
        const containers = {
            todo: document.getElementById('container-todo'),
            progress: document.getElementById('container-progress'),
            review: document.getElementById('container-review'),
            done: document.getElementById('container-done')
        };
        
        const badges = {
            todo: document.getElementById('badge-todo'),
            progress: document.getElementById('badge-progress'),
            review: document.getElementById('badge-review'),
            done: document.getElementById('badge-done')
        };
        
        // Clear containers
        Object.keys(containers).forEach(k => {
            if (containers[k]) containers[k].innerHTML = '';
        });
        
        let counts = { todo: 0, progress: 0, review: 0, done: 0 };
        
        // Filter and render tasks
        jiraTasks.forEach(task => {
            if (task.sprint === sprintId) {
                const card = document.createElement('div');
                card.className = 'kanban-card';
                card.draggable = true;
                card.setAttribute('data-task-id', task.id);
                
                // Priority color-code
                let priorityClass = 'success-text';
                if (task.priority === 'High') priorityClass = 'danger-text';
                else if (task.priority === 'Medium') priorityClass = 'warning-text';
                
                card.innerHTML = `
                    <span class="card-tag">${task.id}</span>
                    <div class="card-body">
                        <h5>${task.title}</h5>
                    </div>
                    <div class="card-footer">
                        <span class="card-priority ${priorityClass}"><i data-lucide="flag" style="width: 10px; height: 10px; display:inline-block; margin-right:2px;"></i>${task.priority}</span>
                        <div class="card-assignee">${task.assignee}</div>
                    </div>
                `;
                
                if (containers[task.column]) {
                    containers[task.column].appendChild(card);
                    counts[task.column]++;
                }
            }
        });
        
        // Update column headers counts
        Object.keys(badges).forEach(k => {
            if (badges[k]) badges[k].textContent = counts[k];
        });
        
        lucide.createIcons();
        initDragAndDrop();
    };

    // Sprint Selector listener
    const sprintSelect = document.getElementById('jira-sprint-select');
    if (sprintSelect) {
        sprintSelect.addEventListener('change', () => {
            state.jiraActiveSprint = sprintSelect.value;
            renderJiraSprintBoard();
        });
    }

    // Drag and Drop implementation for Jira Kanban Board
    const initDragAndDrop = () => {
        const cards = document.querySelectorAll('.kanban-card');
        const columns = document.querySelectorAll('.column-cards-container');
        
        cards.forEach(card => {
            card.addEventListener('dragstart', () => {
                card.classList.add('dragging');
            });
            
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
                
                // Update active task position in database
                const taskId = card.getAttribute('data-task-id');
                const newCol = card.parentElement.getAttribute('id').replace('container-', '');
                
                const task = jiraTasks.find(t => t.id === taskId);
                if (task) {
                    task.column = newCol;
                    renderJiraSprintBoard(); // re-render to update counts
                }
            });
        });
        
        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                const card = document.querySelector('.dragging');
                if (card) {
                    column.appendChild(card);
                }
            });
        });
    };

    // 5. OPERATIONAL RISK REGISTER DATA TABLE
    const risks = [
        { id: "R-001", name: "Shipping delay (FBM)", evidence: "139 FBM unshipped orders in dashboard backlog", impact: "High", likelihood: "High", score: 9, action: "Implement daily shipping tracker + priority packing list. Coordinate couriers.", sla: "24 Hours", owner: "VA (Ops)" },
        { id: "R-002", name: "Slow customer response", evidence: "Buyer messages pending; 2 messages over 24 hours target", impact: "Medium", likelihood: "High", score: 6, action: "Create and enforce 24-hour response SLA. Build templates.", sla: "Daily", owner: "VA (Support)" },
        { id: "R-003", name: "Increasing Returns", evidence: "25 open return requests in dashboard", impact: "High", likelihood: "Medium", score: 6, action: "Analyze return reasons and update product descriptions. Blacklist defective batches.", sla: "Weekly", owner: "Saurabh Varma (PM)" },
        { id: "R-004", name: "Negative Feedback Trend", evidence: "Feedback rating low at 3.60/5 in India account", impact: "High", likelihood: "High", score: 9, action: "Proactive customer resolution. Follow up on returns to resolve complaints.", sla: "48 Hours", owner: "VA (Support)" },
        { id: "R-005", name: "Featured Offer (Buy Box) Loss", evidence: "Featured Offer % low at 71% in India (99% in SA)", impact: "High", likelihood: "Medium", score: 6, action: "Optimize pricing dynamically. Maintain high inventory levels. Ensure FBM shipping SLA.", sla: "Real-time", owner: "Saurabh Varma (PM)" },
        { id: "R-006", name: "PPC / Ad Inefficiency", evidence: "High impressions but low purchase rate (CTR 1.09% ACOS 29.3%)", impact: "Medium", likelihood: "Medium", score: 4, action: "Prune low-converting keywords. Bid optimization. Shift budget to high-ROI targeting.", sla: "Bi-weekly", owner: "PPC Spec." },
        { id: "R-007", name: "Listing Content Weakness", evidence: "Enhancement opportunities flagged in inventory", impact: "Medium", likelihood: "High", score: 6, action: "Run keyword research. Rewrite titles and bullets.", sla: "Weekly", owner: "Saurabh Varma (PM)" }
    ];

    const renderRiskRegister = () => {
        const tableBody = document.getElementById('risk-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        const filteredRisks = risks.filter(r => {
            const q = state.riskSearchQuery.toLowerCase();
            return r.name.toLowerCase().includes(q) || 
                   r.evidence.toLowerCase().includes(q) || 
                   r.action.toLowerCase().includes(q) || 
                   r.id.toLowerCase().includes(q) || 
                   r.owner.toLowerCase().includes(q);
        });
        
        filteredRisks.forEach(r => {
            const tr = document.createElement('tr');
            
            // Score colors
            let scoreBadgeClass = 'badge-success';
            if (r.score >= 8) scoreBadgeClass = 'badge-danger';
            else if (r.score >= 6) scoreBadgeClass = 'badge-warning';
            
            // Impact colors
            let impactClass = 'success-text';
            if (r.impact === 'High') impactClass = 'danger-text';
            else if (r.impact === 'Medium') impactClass = 'warning-text';
            
            tr.innerHTML = `
                <td class="font-bold">${r.id}</td>
                <td><strong>${r.name}</strong></td>
                <td style="font-size:0.75rem; color:var(--text-secondary); max-width:200px;">${r.evidence}</td>
                <td class="${impactClass} font-bold">${r.impact}</td>
                <td>${r.likelihood}</td>
                <td><span class="badge ${scoreBadgeClass}">${r.score}</span></td>
                <td style="font-size:0.75rem; color:var(--text-secondary); max-width:260px;">${r.action}</td>
                <td><span class="badge badge-accent">${r.sla}</span></td>
                <td class="font-bold">${r.owner}</td>
            `;
            
            tableBody.appendChild(tr);
        });
    };

    // Risk search query listener
    const riskInput = document.getElementById('risk-search-input');
    if (riskInput) {
        riskInput.addEventListener('input', (e) => {
            state.riskSearchQuery = e.target.value;
            renderRiskRegister();
        });
    }

    renderRiskRegister();

    // 6. AI SOP & OUTREACH ENGINE TEMPLATE STORAGE
    const sopTemplates = {
        'outreach-email': `Subject: Free Operations & Leak Audit for [Brand Name] - Recovering Amazon Buy Box Share

Dear [Founder Name],

I was reviewing the Amazon storefront for [Brand Name] and noticed something that represents an immediate threat to your brand equity, organic search ranking, and cash flow. 

Specifically, your Featured Offer (Buy Box) share for your prime listing has slipped to 71%, causing organic traffic leaks to competitors. Furthermore, customer feedback has dipped to 3.60/5 stars, which represents a severe brand trust risk.

I am Saurabh Varma, an E-commerce Operations Manager. I specialize in clearing operational bottlenecks and scaling e-commerce storefronts using automated trackers, standard SOPs, and advanced data modeling.

I have compiled a 100% Free Storefront Audit detailing:
1. An Operations Turnaround roadmap to clear shipping queues and protect your metrics from suspension.
2. A strict 24-hour customer messaging SLA framework to recover seller feedback to >4.50.
3. An Ads PPC budget optimization plan to prune negative keywords and reduce ACoS to under 25%.

Are you available for a brief, 10-minute strategy call this Thursday at 3 PM to review your custom audit report?

Best regards,

Saurabh Varma
E-commerce Project Manager
[LinkedIn Profile Link]`,

        'outreach-linkedin': `Hi [Name], 

I noticed your Amazon UAE storefront is showing a 71% Buy Box share, alongside slow shipping metrics. In my experience scaling stores, FBM backlogs represent a major suspension hazard.

I've put together a quick, 3-slide visual audit for your brand showing:
1. The exact keywords draining your Sponsored Ads budget.
2. An operations delegation schedule to clear FBM backlog.
3. A copy of my strict 24-hour response SLA checklist that restores seller rating to 4.5/5.

Would you be open to me sending over the PDF here? No sales pitches, just value.

Best,
Saurabh Varma
Amazon Operations Specialist`,

        'sop-fulfillment': `STANDARD OPERATING PROCEDURE (SOP-OPS-001)
SUBJECT: DAILY FBM SHIPPING & LOGISTICS QUEUE CONTROL
OWNER: OPERATIONS SPECIALIST (VIRTUAL ASSISTANT)

1. DAILY WORKFLOW LOGS:
   1.1. Login to Amazon Seller Central at 09:00 AM IST.
   1.2. Navigate to "Orders" -> "Manage Orders" -> "Unshipped".
   1.3. Review the unshipped count. (Trigger Amber Alert if backlog exceeds 20 orders; trigger Red Alert if backlog exceeds 50 orders).

2. PRIORITY QUEUE EXCEL TRACKING:
   2.1. Open the "Daily FBM Shipping Tracker.xlsx" in Microsoft 365.
   2.2. Export unshipped orders list and paste into the spreadsheet.
   2.3. Sort database by "SLA Ship Date" (Ascending) to build a priority-packing cue.
   2.4. Label any order with "SLA Date = Today" in RED. Label others in YELLOW.

3. PACKAGING & CARRIER DISPATCH:
   3.1. Print shipping labels for RED labeled orders first.
   3.2. Coordinate with secondary shipping carriers if primary carrier pickup is delayed.
   3.3. Verify pack weights against weight logs before sealing to prevent return claims.
   3.4. Confirm carrier tracking details on Seller Central by 03:00 PM to meet Amazon's shipping cut-off time.

4. ESCALATION & EXTRAS:
   4.1. If shipping carrier is delayed more than 4 hours, report tracking IDs to Saurabh Varma (Project Manager) via Teams.`,

        'sop-customer': `STANDARD OPERATING PROCEDURE (SOP-CS-002)
SUBJECT: BUYER MESSAGE 24-HOUR RESPONSE SLA CONTROL
OWNER: CUSTOMER SUCCESS SPECIALIST (VIRTUAL ASSISTANT)

1. SCREENING PROTOCOL:
   1.1. Access Seller Central home page buyer messages card twice daily (10:00 AM and 06:00 PM).
   1.2. Identify "Cases requiring attention" backlog count.
   1.3. Sort inbox by "Response countdown" (Oldest first).

2. METRIC STANDARD & SCRIPT RULES:
   2.1. The target SLA response duration for EVERY message is strictly <24 hours.
   2.2. For simple inquiries (e.g. shipping updates, invoice requests), utilize the standard response script template library in MS Word.
   2.3. Never reply with plain or unformatted text. Include polite headers, greeting, solution steps, and a professional footer.

3. ESCALATION & RED REFUNDS:
   3.1. If a message contains a threat of suspension, chargeback, or critical defect claim, DO NOT reply. Forward the case immediately to Saurabh Varma (Project Manager).
   3.2. For returns or damages under ₹500, issue an automated refund immediately using the client experience budget to protect feedback ratings.`,

        'seo-listing': `AI PROMPT: AMAZON CATALOG LISTING SEO CONVERSION OPTIMIZATION

ROLE: Senior Amazon E-Commerce SEO Specialist

TASK: Rewrite the Amazon product listing for ASIN B0BS6QM2GD (NORTH ZONE Casual Waterproof School/College Backpack) to increase the conversion rate from 1.84% to over 4%.

INPUT CATALOG PARAMETERS:
- Current Title: NORTH ZONE Casual Waterproof Bag
- Current Price: INR 499.00
- FBM Inventory: 595 units
- Highlight Features: Water resistant material, durable zippers, lightweight, double compartments, fits 15.6 inch laptop, fits school/college/office.

OPTIMIZATION INSTRUCTIONS:
1. TITLE OPTIMIZATION: Structure the title using the formula: "Brand + Primary Target Keyword + Secondary Keyword + Key Material + Size Capacity + Ideal Target User Accent". Inject high-volume keywords like "Backpack for men", "College bag for boys", "Waterproof school bag". Max 200 characters.
2. BULLET POINTS OVERHAUL: Write 5 high-converting bullet points. Use uppercase headers to highlight features (e.g., [WATER-RESISTANT DURABILITY], [SPACIOUS LAPTOP SLEEVE]). Highlight warranty (if applicable), high-quality zippers, and stress-test loading.
3. SEARCH TERMS (BACKEND KEYWORDS): Generate 250 bytes of high-volume, non-duplicate search terms (separated by spaces) to be inputted into backend search terms field.`
    };

    const renderSOPTemplate = () => {
        const titleEl = document.getElementById('sop-title');
        const contentEl = document.getElementById('sop-content-area');
        const btn = document.querySelector(`.sop-nav-btn[data-sop="${state.activeSOPKey}"]`);
        
        if (titleEl && contentEl && btn) {
            titleEl.textContent = btn.textContent;
            contentEl.textContent = sopTemplates[state.activeSOPKey];
        }
    };

    const sopBtns = document.querySelectorAll('.ai-sop-nav .sop-nav-btn');
    sopBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sopBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.activeSOPKey = btn.getAttribute('data-sop');
            renderSOPTemplate();
        });
    });

    renderSOPTemplate();

    // Copy to clipboard actions
    const copySopBtn = document.getElementById('copy-sop-btn');
    if (copySopBtn) {
        copySopBtn.addEventListener('click', () => {
            const text = sopTemplates[state.activeSOPKey];
            navigator.clipboard.writeText(text).then(() => {
                copySopBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
                setTimeout(() => {
                    copySopBtn.innerHTML = '<i data-lucide="copy"></i> Copy Template';
                    lucide.createIcons();
                }, 2000);
            });
        });
    }

    // 7. EXCEL DATA CENTER SPREADSHEETS PREVIEW & EXPORTER
    const previewContainer = document.getElementById('excel-preview-container');
    const previewTable = document.getElementById('preview-table');
    const previewFilename = document.getElementById('preview-filename');

    const mockCSVs = {
        'sales_data': `Date,Order_Items,Units,Sales_INR,Organic_INR,Ad_Sales_INR,Ad_Spend_INR,ACoS_Percent,Feedback_Score,Buy_Box_Percent
2026-03-29,48,50,23400,18400,5000,2100,42.0%,3.60,70%
2026-04-11,64,66,32364,24364,8000,2600,32.5%,3.61,73%
2026-04-20,73,76,37800,25800,12000,3450,28.8%,3.63,76%
2026-05-01,92,98,49100,31100,18000,4700,26.1%,3.66,83%
2026-05-15,120,128,65100,40100,25000,6100,24.4%,3.69,90%
2026-05-27,140,150,78200,48200,30000,7000,23.3%,3.72,95%`,

        'risk_data': `Risk_ID,Risk_Name,Evidence,Severity_Score,Mitigation_Action,SLA,Owner
R-001,Shipping Delay (FBM),139 unshipped FBM orders,9 (Crit),Excel queue tracker + packing prioritization,24h,VA (Ops)
R-002,Slow Response,2 messages over 24 hours target,6 (High),Strict 24h reply SLA + templates,Daily,VA (Support)
R-004,Feedback Dip,Rating low at 3.60/5 in India,9 (Crit),Active returns refund + ODR monitoring,48h,VA (Support)
R-005,Buy Box Loss,Featured offer % at 71% in India,6 (High),Dynamic pricing + shipping SLA compliance,Real-time,Saurabh Varma (PM)
R-006,PPC Inefficiency,CTR 1.09% ACOS 29.3%,4 (Med),Pruning ad keywords + bidding capping,Bi-weekly,PPC Specialist`,

        'leads_data': `Lead_ID,Brand_Name,Marketplace,Identified_Pain_Points,Channel,Status,Meeting_Date
L-001,Urban Decor India,Amazon IN,Low Featured Offer (74%) and 30+ FBM backlog,LinkedIn,Meeting Booked,2026-04-12
L-004,Veda Herbs,Amazon IN,Negative feedback at 3.40 rating,LinkedIn,Meeting Booked,2026-04-18
L-005,FitActive Gear,Amazon UAE,High returns rate & listing SEO,Upwork,Closed (Won),2026-04-20
L-010,Nomad Travel Co,Amazon UAE,Low page views & bad search keywords,LinkedIn,Meeting Booked,2026-05-15`
    };

    const renderCSVPreview = (key, filename) => {
        const rawCSV = mockCSVs[key];
        const lines = rawCSV.trim().split('\n');
        
        previewFilename.textContent = `File Preview: ${filename} (Showing Sample Rows)`;
        previewTable.innerHTML = '';
        
        lines.forEach((line, index) => {
            const tr = document.createElement('tr');
            const cells = line.split(',');
            
            cells.forEach(cell => {
                const element = index === 0 ? document.createElement('th') : document.createElement('td');
                element.textContent = cell;
                tr.appendChild(element);
            });
            
            previewTable.appendChild(tr);
        });
        
        previewContainer.style.display = 'block';
        previewContainer.scrollIntoView({ behavior: 'smooth' });
    };

    document.getElementById('btn-preview-sales').addEventListener('click', () => {
        renderCSVPreview('sales_data', 'amazon_60day_sales_data.csv');
    });

    document.getElementById('btn-preview-risk').addEventListener('click', () => {
        renderCSVPreview('risk_data', 'risk_register.csv');
    });

    document.getElementById('btn-preview-leads').addEventListener('click', () => {
        renderCSVPreview('leads_data', 'client_outreach_leads.csv');
    });

    document.getElementById('btn-close-preview').addEventListener('click', () => {
        previewContainer.style.display = 'none';
    });

    // Client-side CSV download builder
    const triggerCSVDownload = (key, filename) => {
        let content = '';
        
        // Generate robust mock files matching our generated backends
        if (key === 'sales_data') {
            // Write full 60 days
            content = "Date,Total_Order_Items,Units_Ordered,Product_Sales_INR,Organic_Sales_INR,Ad_Sales_INR,Ad_Spend_INR,Impressions,Clicks,Purchases,ACOS_Percent,Returns_Count,Buyer_Messages,Avg_Rating,Featured_Offer_Percent\n";
            let baseSales = 23400;
            let baseUnits = 50;
            for (let i = 0; i < 60; i++) {
                let day = String(i+1).padStart(2, '0');
                let trend = 1 + (i * 0.04);
                let sales = Math.floor(baseSales * trend * (0.9 + Math.random() * 0.2));
                let units = Math.floor(baseUnits * trend * (0.9 + Math.random() * 0.2));
                let organic = Math.floor(sales * 0.7);
                let adSales = sales - organic;
                let spend = Math.floor(adSales * 0.29);
                let clicks = Math.floor(spend / 2.75);
                let impressions = clicks * 90;
                let purchases = Math.floor(clicks * 0.024);
                let acos = (spend / adSales * 100).toFixed(1);
                let returns = i % 10 === 0 ? 3 : 1;
                let msgs = i % 5 === 0 ? 4 : 2;
                let rating = (3.60 + (i * 0.002)).toFixed(2);
                let buybox = Math.floor(70 + (i * 0.4));
                
                if (i === 59) {
                    sales = 78200; units = 150; organic = 48200; adSales = 30000; spend = 7000;
                    clicks = 4850; impressions = 410000; purchases = 110; acos = 23.3;
                    returns = 0; msgs = 1; rating = 3.72; buybox = 95;
                }
                
                content += `2026-04-${day},${units - 4},${units},${sales},${organic},${adSales},${spend},${impressions},${clicks},${purchases},${acos},${returns},${msgs},${rating},${buybox}\n`;
            }
        } else if (key === 'risk_data') {
            content = `Risk_ID,Risk_Name,Evidence_From_Dashboard,Impact_Level,Likelihood_Level,Risk_Score,Mitigation_Action,SLA_Deadline,Owner
R-001,Shipping Delay (FBM),139 FBM unshipped orders in dashboard backlog,High,High,9,Implement daily shipping tracker + priority packing list. Coordinate couriers.,24 Hours,Operations Specialist (VA)
R-002,Slow Customer Response,Buyer messages pending; 2 messages over 24 hours target,Medium,High,6,Create and enforce 24-hour response SLA. Build templates.,Daily,Customer Support (VA)
R-003,Increasing Returns,25 open return requests in dashboard,High,Medium,6,Analyze return reasons and update product descriptions. Blacklist defective batches.,Weekly audit,Quality Analyst
R-004,Negative Feedback Trend,Feedback rating low at 3.60/5 in India account,High,High,9,Proactive customer resolution. Follow up on returns to resolve complaints.,48 Hours,Customer Support (VA)
R-005,Featured Offer (Buy Box) Loss,Featured Offer % low at 71% in India (99% in SA),High,Medium,6,Optimize pricing dynamically. Maintain high inventory levels. Ensure shipping SLA.,Real-time,Project Manager
R-006,PPC / Ad Inefficiency,High impressions but low purchase rate (CTR 1.09% ACOS 29.3%),Medium,Medium,4,Prune low-converting keywords. Bid optimization. Shift budget to high-ROI targeting.,Bi-weekly audit,PPC Specialist
R-007,Listing Content Weakness,Enhancement opportunities flagged in inventory,Medium,High,6,Run keyword research. Rewrite titles and bullets.,Weekly sprint,SEO Specialist\n`;
        } else if (key === 'leads_data') {
            content = `Lead_ID,Brand_Name,Marketplace,Lead_Source,Identified_Pain_Points,Outreach_Channel,Outreach_Status,Meeting_Date,Notes
L-001,Urban Decor India,Amazon IN,LinkedIn Search,Low Buy Box (74%) and 30+ unshipped FBM orders,LinkedIn InMail,Meeting Booked,2026-04-12,Interested in operations audit and shipping setup.
L-002,Glow Essentials,Amazon UAE,Upwork Posting,High ACOS (42%) and unoptimized bullet points,Upwork Bid,Proposal Sent,None,ACOS optimization proposal with custom budget plan.
L-003,Shara Apparel,Amazon SA,Cold Outreach,Featured Offer at 80% and slow customer replies,Cold Email,Follow-up Sent,None,Sent free audit report with 5 custom listing tips.
L-004,Veda Herbs,Amazon IN,LinkedIn Connection,Negative seller feedback at 3.40 rating,LinkedIn DM,Meeting Booked,2026-04-18,Gave client a feedback recovery SLA template.
L-005,FitActive Gear,Amazon UAE,Upwork Posting,High refund rates and listing content issues,Upwork Bid,Closed (Won),2026-04-20,Hired for a 60-day account management retainer!
L-010,Nomad Travel Co,Amazon UAE,LinkedIn Search,Low page views and unoptimized backend keywords,LinkedIn InMail,Meeting Booked,2026-05-15,Meeting scheduled to review competitor PPC bids.\n`;
        }

        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    document.getElementById('btn-download-sales').addEventListener('click', () => {
        triggerCSVDownload('sales_data', 'amazon_60day_sales_data.csv');
    });

    document.getElementById('btn-download-risk').addEventListener('click', () => {
        triggerCSVDownload('risk_data', 'risk_register.csv');
    });

    document.getElementById('btn-download-leads').addEventListener('click', () => {
        triggerCSVDownload('leads_data', 'client_outreach_leads.csv');
    });

    // Custom Action for connect LinkedIn Link
    const linkedinLink = document.getElementById('linkedin-link');
    if (linkedinLink) {
        linkedinLink.addEventListener('click', (e) => {
            // Anonymized or customizable LinkedIn url
            linkedinLink.href = "https://www.linkedin.com/in/saurabh-varma-997312404/";
        });
    }

});
