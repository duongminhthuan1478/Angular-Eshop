** First time using Nx? Check out this interactive Nx tutorial: https://nx.dev/angular-tutorial/01-create-application
# Dry run prefix: run demo, without write to disk 
--dry-run
Example: npx nx g @nrwl/workspace:lib [name] --dry-run
# Create nx workspace, default create application , preset is angualr or react or js: 
npx create-nx-workspace --preset=[angular]

# Create application: 
nx generate @nrwl/angular:app appname
# Run with any port: 
nx serve admin --port 4100
# Create component, we can create on angular cli 'ng g c name' as well
nx g component home-page

# Create lib: 
ng g @nrwl/angular:lib [ui/order] --prefix order || npx nx g @nrwl/workspace:lib [order] --prefix order 
=> prefix for lib selector <order-user></order-user>
