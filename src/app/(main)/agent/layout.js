
import Provider from "./provider";

export default function Layout({ children }) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}
