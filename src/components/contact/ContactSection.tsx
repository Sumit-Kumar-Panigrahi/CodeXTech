import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Clock,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import styles from './Contact.module.css';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const contactEmail = siteConfig.contactEmail || 'sksumitkumarpanigrahi@gmail.com';

  // Handle Copy Email
  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(contactEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = contactEmail;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    } catch {
      setCopied(false);
    }
  };

  // Validate Form Fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name or team name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g., name@example.com).';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a brief subject for your inquiry.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message or describe your project concept.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Submit Handler: Pure Mailto workflow (no fake automatic delivery claim)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const emailSubject = `[CODEXTECH Inquiry] ${formData.subject.trim()}`;
    const emailBody = `Sender Name: ${formData.name.trim()}
Sender Email: ${formData.email.trim()}

Message:
${formData.message.trim()}

--------------------------------------------------
Sent via CODEXTECH Studio Contact Form`;

    const mailtoUrl = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Set clear helper message: email client opening
    setStatusMessage(
      'Opening your default email application with your message pre-filled. Please review and click Send in your email client to complete.'
    );

    // Open mailto link
    window.location.href = mailtoUrl;

    // Reset submitting lock after brief delay
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2200);
  };

  return (
    <section id="contact" className={styles.contactSection} aria-label="Contact CODEXTECH">
      {/* Background Ambient Glow */}
      <div className={styles.ambientGlow} />

      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>
            <Sparkles size={13} />
            <span>Direct Inquiry & Collaboration</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Have an Idea? <span className={styles.titleAccent}>Let's Build Something Exceptional.</span>
          </h2>
          <p className={styles.sectionDesc}>
            Have a project idea, collaboration opportunity, or a vision you'd like to bring to life?
            Let's connect and explore what's possible.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className={styles.contactGrid}>
          {/* Left Column: Direct Studio Information */}
          <motion.div
            className={styles.infoColumn}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
          >
            {/* Direct Email Card */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>
                <div className={styles.infoIconBox}>
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className={styles.infoTitle}>Official Studio Mail</h3>
                  <span style={{ fontSize: '11px', color: 'var(--color-cyan-circuit)', fontWeight: 600 }}>
                    Direct Inbox
                  </span>
                </div>
              </div>

              <p className={styles.infoDesc}>
                Reach out directly for engineering partnerships, hackathon inquiries, project discussions, or
                general questions.
              </p>

              {/* Verified Email & Copy Button */}
              <div className={styles.emailDisplayBox}>
                <a
                  href={`mailto:${contactEmail}`}
                  className={styles.emailTextLink}
                  title="Click to open default email client"
                >
                  {contactEmail}
                </a>

                <button
                  type="button"
                  className={`${styles.copyBtn} ${copied ? styles.copiedBtn : ''}`}
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                  title="Copy email address"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Guarantees & Values */}
              <ul className={styles.assurancesList}>
                <li className={styles.assuranceItem}>
                  <ShieldCheck size={14} className={styles.assuranceIcon} />
                  <span>
                    <strong>Direct Team Review:</strong> Sumit Kumar Panigrahi and the CODEXTECH collective
                    personally review every communication.
                  </span>
                </li>
                <li className={styles.assuranceItem}>
                  <Clock size={14} className={styles.assuranceIcon} />
                  <span>
                    <strong>Prompt Response:</strong> We aim to acknowledge and follow up on genuine inquiries in
                    a timely manner.
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Mailto-Based Contact Form */}
          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Compose Your Message</h3>
              <p className={styles.formSubtitle}>
                Fill out the details below. Clicking Send Message will generate an email in your default application.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1: Name and Email */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="contact-name" className={styles.formLabel}>
                    <span>Your Name <span className={styles.requiredAsterisk}>*</span></span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Alex Morgan"
                    className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && (
                    <div className={styles.fieldErrorText} role="alert">
                      <AlertCircle size={12} />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact-email" className={styles.formLabel}>
                    <span>Your Email <span className={styles.requiredAsterisk}>*</span></span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., alex@example.com"
                    className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`}
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <div className={styles.fieldErrorText} role="alert">
                      <AlertCircle size={12} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Subject */}
              <div className={styles.formGroup}>
                <label htmlFor="contact-subject" className={styles.formLabel}>
                  <span>Subject <span className={styles.requiredAsterisk}>*</span></span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Project Collaboration / Web Platform Inquiry"
                  className={`${styles.formInput} ${errors.subject ? styles.formInputError : ''}`}
                  aria-required="true"
                  aria-invalid={Boolean(errors.subject)}
                />
                {errors.subject && (
                  <div className={styles.fieldErrorText} role="alert">
                    <AlertCircle size={12} />
                    <span>{errors.subject}</span>
                  </div>
                )}
              </div>

              {/* Row 3: Message */}
              <div className={styles.formGroup}>
                <label htmlFor="contact-message" className={styles.formLabel}>
                  <span>Message <span className={styles.requiredAsterisk}>*</span></span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project concept, requirements, or what you would like to explore together..."
                  className={`${styles.formTextarea} ${errors.message ? styles.formInputError : ''}`}
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && (
                  <div className={styles.fieldErrorText} role="alert">
                    <AlertCircle size={12} />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* Mailto Helper Explanatory Notice */}
              <div className={styles.mailtoHelperNotice}>
                <Clock size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <p>
                  <strong>How this works:</strong> This form uses your device's email application via <code>mailto:</code>.
                  Clicking <strong>Send Message</strong> will open your client (such as Outlook, Apple Mail, or Gmail) with your
                  inquiry pre-formatted so you can review and press send manually.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
                title="Prepare message in your email client"
              >
                <Send size={15} />
                <span>{isSubmitting ? 'Opening Email Client...' : 'Send Message via Email Client'}</span>
              </button>

              {/* Status Feedback Banner */}
              {statusMessage && (
                <div className={`${styles.statusFeedback} ${styles.statusPrepared}`} role="status">
                  <ExternalLink size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>{statusMessage}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                      If your client didn't open, you can send directly to{' '}
                      <a
                        href={`mailto:${contactEmail}`}
                        style={{ color: 'var(--color-accent-primary)', textDecoration: 'underline' }}
                      >
                        {contactEmail}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
