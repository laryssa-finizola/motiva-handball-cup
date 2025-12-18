import { SOCIAL_LINKS } from '@/lib/constants';
import { Instagram } from 'lucide-react'; 

export function Footer() {
  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Copa Motiva. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex gap-4">
            <a 
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}