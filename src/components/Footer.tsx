import { contact, eventInfo } from "../data/eventData";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>{eventInfo.name}</p>
      {contact.email && <p>お問い合わせ：{contact.email}</p>}
      {contact.sns.length > 0 && (
        <ul className="site-footer__sns">
          {contact.sns.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <p className="site-footer__copy">
        &copy; {new Date().getFullYear()} {eventInfo.name}
      </p>
    </footer>
  );
}
