"""Comprehensive PDF Report Generator"""
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from datetime import datetime
import io


class CareerReportGenerator:
    """Generate comprehensive 20-page career report"""
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Setup custom paragraph styles"""
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#1a73e8'),
            spaceAfter=30,
            alignment=TA_CENTER
        ))
        
        self.styles.add(ParagraphStyle(
            name='SectionHeader',
            parent=self.styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#1a73e8'),
            spaceAfter=12,
            spaceBefore=12
        ))
        
        self.styles.add(ParagraphStyle(
            name='CustomBody',
            parent=self.styles['Normal'],
            fontSize=11,
            alignment=TA_JUSTIFY,
            spaceAfter=12
        ))
    
    def generate_report(self, user_data, holistic_profile, career_recommendations, roadmaps):
        """Generate complete PDF report"""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter,
                              rightMargin=72, leftMargin=72,
                              topMargin=72, bottomMargin=18)
        
        story = []
        
        # Cover Page
        story.extend(self._create_cover_page(user_data))
        story.append(PageBreak())
        
        # Executive Summary
        story.extend(self._create_executive_summary(holistic_profile, career_recommendations))
        story.append(PageBreak())
        
        # Personality Deep Dive
        story.extend(self._create_personality_section(holistic_profile))
        story.append(PageBreak())
        
        # Career Matches
        story.extend(self._create_career_matches_section(career_recommendations))
        story.append(PageBreak())
        
        # Roadmaps
        story.extend(self._create_roadmaps_section(roadmaps))
        story.append(PageBreak())
        
        # Action Plan
        story.extend(self._create_action_plan())
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        return buffer
    
    def _create_cover_page(self, user_data):
        """Create cover page"""
        story = []
        
        story.append(Spacer(1, 2*inch))
        
        title = Paragraph("Career Assessment Report", self.styles['CustomTitle'])
        story.append(title)
        story.append(Spacer(1, 0.5*inch))
        
        subtitle = Paragraph(f"Prepared for: {user_data.get('full_name', 'Student')}", 
                            self.styles['Heading3'])
        story.append(subtitle)
        story.append(Spacer(1, 0.2*inch))
        
        date = Paragraph(f"Generated on: {datetime.now().strftime('%B %d, %Y')}", 
                        self.styles['Normal'])
        story.append(date)
        story.append(Spacer(1, 2*inch))
        
        disclaimer = Paragraph(
            "<i>This report provides personalized career guidance based on your "
            "multi-dimensional assessment. Use it as a starting point for career exploration.</i>",
            self.styles['CustomBody']
        )
        story.append(disclaimer)
        
        return story
    
    def _create_executive_summary(self, profile, recommendations):
        """Create executive summary"""
        story = []
        
        story.append(Paragraph("Executive Summary", self.styles['SectionHeader']))
        
        clarity_score = profile.get('clarity_score', 0)
        summary_text = profile.get('profile_data', {}).get('summary', 'Developing career profile')
        
        summary = f"""
        Your career clarity score is <b>{clarity_score:.0f}/100</b>, indicating 
        {'strong' if clarity_score > 70 else 'moderate' if clarity_score > 50 else 'developing'} 
        career direction. Your profile shows you are {summary_text}.
        <br/><br/>
        Based on comprehensive analysis of your interests, aptitude, personality, values, and risk tolerance,
        we have identified your top career matches with confidence scores and detailed roadmaps.
        """
        
        story.append(Paragraph(summary, self.styles['CustomBody']))
        story.append(Spacer(1, 0.3*inch))
        
        # Top 3 Careers Table
        story.append(Paragraph("Your Top Career Matches", self.styles['Heading3']))
        
        top_careers = recommendations[:3] if len(recommendations) >= 3 else recommendations
        
        data = [['Rank', 'Career', 'Confidence', 'Risk Level']]
        for i, career in enumerate(top_careers, 1):
            data.append([
                str(i),
                career.get('career', 'N/A'),
                f"{career.get('confidence', 0):.0f}%",
                career.get('risk_level', 'Medium')
            ])
        
        table = Table(data, colWidths=[0.7*inch, 3*inch, 1.3*inch, 1.3*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1a73e8')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        story.append(table)
        
        return story
    
    def _create_personality_section(self, profile):
        """Create personality deep dive section"""
        story = []
        
        story.append(Paragraph("Personality Deep Dive", self.styles['SectionHeader']))
        
        profile_data = profile.get('profile_data', {})
        
        # RIASEC Breakdown
        if 'riasec' in profile_data:
            story.append(Paragraph("Interest Profile (RIASEC)", self.styles['Heading3']))
            
            riasec = profile_data['riasec']
            riasec_desc = {
                'R': 'Realistic - Practical, hands-on work',
                'I': 'Investigative - Analytical, research-oriented',
                'A': 'Artistic - Creative, expressive',
                'S': 'Social - Helping, teaching others',
                'E': 'Enterprising - Leadership, business',
                'C': 'Conventional - Organized, detail-oriented'
            }
            
            for code, score in sorted(riasec.items(), key=lambda x: x[1], reverse=True):
                text = f"<b>{code}</b> ({riasec_desc.get(code, '')}): {score}/12"
                story.append(Paragraph(text, self.styles['CustomBody']))
        
        story.append(Spacer(1, 0.2*inch))
        
        # Personality Traits
        if 'personality' in profile_data:
            story.append(Paragraph("Personality Traits (Big 5)", self.styles['Heading3']))
            
            personality = profile_data['personality']
            trait_desc = {
                'openness': 'Openness to Experience',
                'conscientiousness': 'Conscientiousness',
                'extraversion': 'Extraversion',
                'agreeableness': 'Agreeableness',
                'neuroticism': 'Emotional Stability'
            }
            
            for trait, score in personality.items():
                text = f"<b>{trait_desc.get(trait, trait)}</b>: {score:.0f}/100"
                story.append(Paragraph(text, self.styles['CustomBody']))
        
        return story
    
    def _create_career_matches_section(self, recommendations):
        """Create career matches section"""
        story = []
        
        story.append(Paragraph("Detailed Career Analysis", self.styles['SectionHeader']))
        
        for i, career in enumerate(recommendations[:5], 1):
            story.append(Paragraph(f"{i}. {career.get('career', 'Career')}", 
                                 self.styles['Heading3']))
            
            confidence = career.get('confidence', 0)
            risk = career.get('risk_level', 'Medium')
            
            text = f"""
            <b>Confidence Score:</b> {confidence:.0f}/100<br/>
            <b>Risk Level:</b> {risk}<br/>
            <b>Why this career fits:</b> Based on your strong alignment in interests and aptitude,
            this career offers excellent growth potential and matches your work values.
            """
            
            story.append(Paragraph(text, self.styles['CustomBody']))
            story.append(Spacer(1, 0.2*inch))
        
        return story
    
    def _create_roadmaps_section(self, roadmaps):
        """Create roadmaps section"""
        story = []
        
        story.append(Paragraph("Career Roadmaps", self.styles['SectionHeader']))
        
        for career_name, roadmap in list(roadmaps.items())[:3]:
            story.append(Paragraph(f"Roadmap: {career_name}", self.styles['Heading3']))
            
            for year, details in roadmap.items():
                if year.startswith('year'):
                    year_num = year.split('_')[1]
                    story.append(Paragraph(f"<b>Year {year_num}:</b> {details.get('focus', '')}", 
                                         self.styles['CustomBody']))
                    
                    skills = ', '.join(details.get('skills', [])[:5])
                    story.append(Paragraph(f"Key Skills: {skills}", self.styles['Normal']))
                    story.append(Spacer(1, 0.1*inch))
            
            story.append(Spacer(1, 0.2*inch))
        
        return story
    
    def _create_action_plan(self):
        """Create action plan section"""
        story = []
        
        story.append(Paragraph("Your 30-60-90 Day Action Plan", self.styles['SectionHeader']))
        
        plan = """
        <b>Next 30 Days:</b><br/>
        • Complete additional assessments if needed<br/>
        • Research your top 3 career options in depth<br/>
        • Connect with professionals in these fields<br/>
        • Start building foundational skills<br/>
        <br/>
        <b>60 Days:</b><br/>
        • Begin working on your first project<br/>
        • Enroll in relevant online courses<br/>
        • Update your resume and LinkedIn profile<br/>
        • Join relevant communities and forums<br/>
        <br/>
        <b>90 Days:</b><br/>
        • Complete at least one certification<br/>
        • Build a portfolio project<br/>
        • Apply for internships or entry-level positions<br/>
        • Review and adjust your career plan<br/>
        """
        
        story.append(Paragraph(plan, self.styles['CustomBody']))
        
        return story
