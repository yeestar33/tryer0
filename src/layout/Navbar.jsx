const navLinks = [
    {href: "#about", label: "About"},
    {href: "#projects", label: "Projects"},
    {href: "#experience", label: "Experience"},
    {href: "#testimonials", label: "Testimonials"},
];

export const Navbar = () => {
    return(
        <header className="fixed top-0 left-0 right-0 bg-transparent py-5">
            <nav className="container mx-auto px-6 flex items-center justify-between">
                <a 
                    href="#" 
                    className="text-4xl font-bold tracking-tight hover:text-primary"
                >
                    John Butt Simulator<span></span>
                </a>

                <a
                    href="#"
                    className="text-4xl font-bold tracking-tight hover:text-tryer"
                >
                    buttsmeller<span></span>
                </a>

                {/* Desktop Nav */}
                <div className="flex ite,s-center gap-1"> 
                    <div className="glass rounded-full px-4 pt-1 flex items-center gap-1">   
                        {navLinks.map((link, index) => (
                            <a href={link.href} key={index} className="px-4 py-1 text-sm text-muted-foreground rounded-full hover:text-foreground hover:bg-surface">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    ) 
};