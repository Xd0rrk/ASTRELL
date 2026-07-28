'use client';

import { useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Rand Khaled',
    role: 'CREATIVE DIRECTOR & BRAND LEAD',
    image: '/rand_khaled.jpg',
    social: { instagram: 'https://www.instagram.com/rundkhaled?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', linkedin: '#', twitter: '#' },
  },
  {
    id: '2',
    name: 'Elena Varga',
    role: 'LEAD WEB ARCHITECT',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '3',
    name: 'Julian Cross',
    role: 'PACKAGING SPECIALIST',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '4',
    name: 'Nadia Al-Mansoor',
    role: '3D VISUAL DESIGNER',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    social: { instagram: '#', linkedin: '#' },
  },
  {
    id: '5',
    name: 'Simon A-A',
    role: 'SYSTEMS ENGINEER',
    image: '/simon_aa.jpg',
    social: { instagram: 'https://www.instagram.com/asxsimon', linkedin: '#' },
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 lg:gap-16 select-none w-full max-w-6xl mx-auto py-4 font-sans">
      {/* ── Left: photo grid ── */}
      <div className="flex gap-3 md:gap-4 flex-shrink-0 overflow-x-auto pb-2 md:pb-0 justify-center">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[120px] h-[130px] sm:w-[140px] sm:h-[150px] md:w-[165px] md:h-[175px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3 mt-[40px] sm:mt-[50px] md:mt-[60px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[130px] h-[140px] sm:w-[155px] sm:h-[165px] md:w-[180px] md:h-[190px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3 mt-[20px] sm:mt-[25px] md:mt-[30px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[125px] h-[135px] sm:w-[145px] sm:h-[155px] md:w-[170px] md:h-[180px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list ── */}
      <div className="flex flex-col gap-3 md:gap-4 pt-2 flex-1 w-full justify-center">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 transition-all duration-500 border border-white/10 relative group bg-neutral-900',
        className,
        isDimmed ? 'opacity-40 scale-95' : 'opacity-100 scale-100',
        isActive ? 'border-[#FF3E00] shadow-[0_0_30px_rgba(255,62,0,0.35)] ring-1 ring-[#FF3E00]' : ''
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter,transform] duration-500 group-hover:scale-105"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1.05)' : 'grayscale(0.85) brightness(0.75)',
        }}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
    </div>
  );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.twitter ?? member.social?.linkedin ?? member.social?.instagram ?? member.social?.behance;

  return (
    <div
      className={cn(
        'cursor-pointer transition-all duration-300 p-3.5 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.02]',
        isDimmed ? 'opacity-40' : 'opacity-100',
        isActive ? 'bg-white/[0.05] border-white/15 shadow-lg' : ''
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + social */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'h-2.5 rounded-full flex-shrink-0 transition-all duration-300',
            isActive ? 'bg-[#FF3E00] w-6' : 'bg-white/20 w-3',
          )}
        />
        <span
          className={cn(
            'text-lg md:text-2xl font-display font-medium leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-white font-bold' : 'text-neutral-300',
          )}
        >
          {member.name}
        </span>

        {/* Social icons */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-2 ml-2 transition-all duration-300',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none',
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-md bg-white/10 text-neutral-300 hover:text-white hover:bg-[#FF3E00] transition-all duration-150 hover:scale-110"
                title="X / Twitter"
              >
                <FaTwitter size={11} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-md bg-white/10 text-neutral-300 hover:text-white hover:bg-[#FF3E00] transition-all duration-150 hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedinIn size={11} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-md bg-white/10 text-neutral-300 hover:text-white hover:bg-[#FF3E00] transition-all duration-150 hover:scale-110"
                title="Instagram"
              >
                <FaInstagram size={11} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-md bg-white/10 text-neutral-300 hover:text-white hover:bg-[#FF3E00] transition-all duration-150 hover:scale-110"
                title="Behance"
              >
                <FaBehance size={11} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-2 pl-[24px] text-[10px] md:text-xs font-mono font-medium uppercase tracking-[0.2em] text-[#FF3E00]">
        {member.role}
      </p>
    </div>
  );
}
