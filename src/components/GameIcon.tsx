/**
 * GameIcon — mappe une string vers une icône lucide-react.
 * RÈGLE (loi n°5) : toute icône de l'UI passe par ici. Jamais d'emoji.
 * Fallback : si `name` n'est pas connu, rend la string telle quelle.
 *
 * ICON_MAP a été enrichi avec les icônes utiles aux outils psychosociaux
 * (fleur, ancre, souffle, carnet, ressources de crise, etc.).
 */
import {
  // base charte
  Hospital, Microscope, Zap, FlaskConical, RotateCcw, Brain, Flame, Gem, Crown, Star,
  Trophy, Target, ClipboardList, Eye, Feather, Pill, PenTool, BookOpen, Timer,
  MousePointer, BarChart3, PenLine, Smile, Lock, KeyRound, Key, Ticket,
  Laugh, Glasses, Ghost, Squirrel, Cat, Fish, Skull, Bot, Orbit, Sparkles, Bird,
  Palette, Gamepad2, Medal, Tent, Pencil, X, Lightbulb, Check,
  Frown, Angry, Meh, CircleHelp, Waves, Search, Stethoscope, Paperclip,
  ThumbsUp, TrendingUp, TrendingDown, AlertTriangle, Siren, DoorOpen,
  Bone, Droplets, PartyPopper, Drama,
  // ajouts domaine
  Flower2, HeartPulse, Heart, HeartHandshake, Wind, Anchor, NotebookPen, ListChecks,
  ShieldAlert, ShieldCheck, Phone, PhoneCall, Sprout, Leaf, Footprints, CalendarClock,
  MessageCircle, Users, Compass, Scale, CloudRain, Sunrise, Hand, Map, Flag, CheckCircle2,
  CircleAlert, Info, Pause, Play, ArrowRight, ArrowLeft, Plus, Trash2, Download, Printer,
  FileText, FileJson, RefreshCw, ChevronDown, ChevronUp, Activity, ClipboardCheck,
  Home, LayoutDashboard, WifiOff, LayoutGrid, Tag, Repeat, Settings,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  hospital: Hospital, microscope: Microscope, zap: Zap, "flask-conical": FlaskConical,
  "rotate-ccw": RotateCcw, brain: Brain, flame: Flame, gem: Gem, crown: Crown, star: Star,
  trophy: Trophy, target: Target, "clipboard-list": ClipboardList, eye: Eye, feather: Feather,
  pill: Pill, "pen-tool": PenTool, "book-open": BookOpen, timer: Timer,
  "mouse-pointer": MousePointer, "bar-chart-3": BarChart3, "pen-line": PenLine, smile: Smile,
  lock: Lock, "key-round": KeyRound, key: Key, ticket: Ticket, medal: Medal,
  "gamepad-2": Gamepad2, ghost: Ghost, tent: Tent, "party-popper": PartyPopper, drama: Drama,
  pencil: Pencil, x: X, lightbulb: Lightbulb, check: Check, laugh: Laugh, glasses: Glasses,
  frown: Frown, angry: Angry, meh: Meh, "circle-help": CircleHelp, waves: Waves, search: Search,
  stethoscope: Stethoscope, paperclip: Paperclip, "thumbs-up": ThumbsUp, "trending-up": TrendingUp,
  "trending-down": TrendingDown, "alert-triangle": AlertTriangle, siren: Siren, "door-open": DoorOpen,
  palette: Palette, sparkles: Sparkles, squirrel: Squirrel, cat: Cat, fish: Fish, bird: Bird,
  skull: Skull, bone: Bone, bot: Bot, orbit: Orbit, droplets: Droplets,
  // ajouts domaine
  flower: Flower2, "heart-pulse": HeartPulse, heart: Heart, "heart-handshake": HeartHandshake,
  wind: Wind, anchor: Anchor, "notebook-pen": NotebookPen, "list-checks": ListChecks,
  "shield-alert": ShieldAlert, "shield-check": ShieldCheck, phone: Phone, "phone-call": PhoneCall,
  sprout: Sprout, leaf: Leaf, footprints: Footprints, "calendar-clock": CalendarClock,
  "message-circle": MessageCircle, users: Users, compass: Compass, scale: Scale,
  "cloud-rain": CloudRain, sunrise: Sunrise, hand: Hand, map: Map, flag: Flag,
  "check-circle-2": CheckCircle2, "circle-alert": CircleAlert, info: Info, pause: Pause, play: Play,
  "arrow-right": ArrowRight, "arrow-left": ArrowLeft, plus: Plus, "trash-2": Trash2,
  download: Download, printer: Printer, "file-text": FileText, "file-json": FileJson,
  "refresh-cw": RefreshCw, "chevron-down": ChevronDown, "chevron-up": ChevronUp,
  activity: Activity, "clipboard-check": ClipboardCheck,
  home: Home, "layout-dashboard": LayoutDashboard, "wifi-off": WifiOff,
  "layout-grid": LayoutGrid, tag: Tag, repeat: Repeat, settings: Settings,
};

interface GameIconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}

export default function GameIcon({ name, size = 24, className, strokeWidth, ...rest }: GameIconProps) {
  const IconComponent = ICON_MAP[name];
  if (!IconComponent) {
    return <span className={className}>{name}</span>;
  }
  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} aria-hidden {...rest} />;
}

export { ICON_MAP };
