"use client";

import Link from "next/link";
import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";
import { getDocumentByFile } from "@/lib/documents";
import { stripMarkdown } from "@/lib/text";

function textFromNode(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return textFromNode(child.props.children);
      }
      return "";
    })
    .join("");
}

function headingId(slugger: GithubSlugger, children: ReactNode) {
  return slugger.slug(stripMarkdown(textFromNode(children)));
}

function resolveHref(href?: string) {
  if (!href) return href;
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")) {
    return href;
  }

  const match = href.match(/^(?:\.\/|\.\.\/)?([^#/]+\.md)(#.*)?$/i);
  if (match) {
    const doc = getDocumentByFile(match[1]);
    if (doc) return `/${doc.slug}${match[2] ?? ""}`;
  }

  return href;
}

export function MarkdownView({ content }: { content: string }) {
  const slugger = new GithubSlugger();

  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1>{children}</h1>,
          h2: ({ children }) => {
            const id = headingId(slugger, children);
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const id = headingId(slugger, children);
            return <h3 id={id}>{children}</h3>;
          },
          h4: ({ children }) => <h4>{children}</h4>,
          a: ({ href, children }) => {
            const next = resolveHref(href);
            const external = Boolean(next?.startsWith("http"));
            if (!next) return <span>{children}</span>;
            if (next.startsWith("/")) {
              return <Link href={next}>{children}</Link>;
            }
            return (
              <a href={next} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
                {children}
              </a>
            );
          },
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
          pre: ({ children }) => <pre>{children}</pre>,
          input: (props) => {
            if (props.type === "checkbox") {
              return <input type="checkbox" checked={Boolean(props.checked)} readOnly className="checkbox" />;
            }
            return <input {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
